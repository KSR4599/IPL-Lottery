import React, { Component } from 'react';
//import './App.css';
import { Input,Icon,Message,Button,Label,Segment,Image,Dimmer, Loader,Progress } from 'semantic-ui-react';
import web3 from './web3.js';
import lottery from './lottery.js';
import srhpic from './srh.png';
import rcbpic from './rcb.png';
import eth from './eth.png';



class App extends Component {

state = {
  manager : '',
  team1 : [],
  team2 :[],
  balance: '',
  value1: '',
  value2:'',
  message:'',
  winamount : 0
};

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();    
    var team1 = await lottery.methods.getTeam1().call();   
    var team2 = await lottery.methods.getTeam2().call(); 
    const balance = await web3.eth.getBalance(lottery.options.address);  //Since we need to display the balance of money i.e the stake the winner is about to receive upon declaring the winner.
    //const winamount = await lottery.methods.winningamount().call();   

    this.setState({manager:manager, balance : balance, team1 : team1, team2 : team2, message : "Welcome to Ethereum Betting Platform"});

  }

//Handling of the pool entering
  onSubmit1 = async (event)=>{  //This type of arrow representation spares from usage of the this keyword as it automatically refers to the current component.
    event.preventDefault();  //This statement make sure that the form wont get submitted in the default html way.

this.setState({message : 'We are picking up the winner, just hold on' });

   const accounts = await web3.eth.getAccounts();

this.setState({ message: 'We are getting the things done..please wait'});
   await lottery.methods.enter1().send({
     from: accounts[0],    //Always setting the first account to enter the pool
     value: web3.utils.toWei(this.state.value1, 'ether'),
     
   })
   this.setState({message : 'You have been entered into the pool.Good Luck!'});
  }

  //Handling of the pool entering
  onSubmit2 = async (event)=>{  

    console.log("On submit2 Called");
    event.preventDefault();  

this.setState({message : 'We are picking up the winner, just hold on' });

   const accounts = await web3.eth.getAccounts();

this.setState({ message: 'We are getting the things done..please wait'});
   await lottery.methods.enter2().send({
     from: accounts[0],    
     value: web3.utils.toWei(this.state.value2, 'ether') 
   })
   this.setState({message : 'You have been entered into the pool.Good Luck!'});
  }


  //Handling of the pick winner onClick
  onClick = async () => {
    this.setState({message : 'We are picking up the winner, just hold on' });
    const accounts = await web3.eth.getAccounts();
    var winner = await lottery.methods.pickWinner().send({
      from : accounts[0]
    })
 var s = await lottery.methods.k().call();
 var winmoney = await lottery.methods.winningamount().call();
    console.log("WINNER IS ",s);
    winmoney = web3.utils.fromWei(winmoney, 'ether');
    console.log("WINNING MONEY ",winmoney);

    if(s === "1"){
      this.setState({ message : `SRH are the winners! Each of the winning player gets the total amount of ${winmoney} ethers!`});
    } else {
      this.setState({ message : `RCB are the winners! Each of the winning player gets the total amount of ${winmoney} ethers!`});
    }

  }

  onClick1 = async () => {
   var winner = await lottery.methods.randd().call();
    console.log("Random number is : ",winner);

  }



  render() {
    return (
    
  

      <div style={{backgroundImage: 'url(' + require('./bg-image.jpg') + ')'}}>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"></link>
    <div align="center">

      <h2> <Icon name='ethereum' /> Ethereum Betting Platform </h2>
   
    <Label basic color='blue' pointing='below' size='big'>
    This Betting Platform is Managed by {this.state.manager}. There are { this.state.team1.length + this.state.team2.length} Players in the Pool
    Competing to Win the Total Amount of {web3.utils.fromWei(this.state.balance, 'ether') } ether!
      </Label>
  

   <hr />

   <h4>Want to participate in the Betting? </h4>

 
   {/*Form 1 */}
   <form onSubmit = { this.onSubmit1}>  
 <div>
 <img src={srhpic}/>

   <Input iconPosition='left' placeholder='Enter with 0.1 Ethers'>
      <Icon name='ethereum' />
  
 <input
 value = { this.state.value1 }
 onChange = {event => this.setState({ value1 : event.target.value})}  //on the change 0f value of input field, the current states value will be set to the input fields value.
 />
    </Input>

{" "}

<Button positive>Enter The Pool</Button>
 </div>

   </form>


   {/*Form 2 */}
   <form onSubmit = { this.onSubmit2}>  
 <div>
 <img src={rcbpic}/>

     <Input iconPosition='left' placeholder='Enter with 0.1 Ethers'>
      <Icon name='ethereum' />
      <input
 value = { this.state.value2 }
 onChange = {event => this.setState({ value2 : event.target.value})}  //on the change 0f value of input field, the current states value will be set to the input fields value.
 />
    </Input>
{" "}
<Button positive>Enter The Pool</Button>
 </div>

   </form>

   <Segment color='teal'>  <h2>{this.state.message}</h2></Segment>


   .{"\n"}

<h3> Pick The winner! </h3>
<Button inverted color='brown' onClick = { this.onClick }>
        Pick Winner!
      </Button>

    <hr />


    </div>
    </div>
    );

  }

}

export default App;
