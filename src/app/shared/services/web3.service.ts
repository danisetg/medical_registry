import { Injectable } from '@angular/core';
// import Web3 from web3.js
import Web3 from "web3";
import * as TruffleContract from 'truffle-contract';
import { Subject } from 'rxjs';

let tokenAbi = require('../../../contracts/Medical.json');

declare let window: any;
declare let require: any;
declare let ethereum: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  // declare web3 object
  private web3: Web3;
  private web3Provider: null;
  private contracts: {};
  private contract: any;
  public accounts: string[];
  public account: string;
  public contractInstance: any;
  public ready = false;

  public accountsObservable = new Subject<string[]>();


 constructor() {
   // call createWeb3
   this.createWeb3();
 }

 // this method is used to create web3 object with MetaMask provider
  // create a exhibition contract instance
  public async createWeb3() {
      // Checking if Web3 has been injected by the browser (MetaMask)
      if (typeof window.web3 !== "undefined") {
        // Use MetaMask's provider
        console.log(window.web3);
        this.web3Provider = window.web3.currentProvider;
        this.web3 = new Web3(new Web3(this.web3Provider));
        console.log(this.web3);
        //create a exhibition contract instance
        this.contract = TruffleContract(tokenAbi);
        this.contract.setProvider(this.web3Provider);

        this.contractInstance = await this.contract.deployed();
  
        setInterval(this.refreshAccounts, 500);

        this.enableAccounts().then(() => {
          this.refreshAccounts();
        });
      } else {
        console.log("No web3? Please trying with MetaMask!");
      }
  }
  private async enableAccounts() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
      } catch (error) {
        // User denied account access...
      }
    }
  }
  public refreshAccounts = () => {
    if (typeof window.web3 !== 'undefined') {
      this.web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          console.warn('There was an error fetching your accounts.');
          return;
        }

        // Get the initial account balance so it can be displayed.
        if (accs.length === 0) {
          console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
          return;
        }

        if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
          console.log('Observed new accounts');

          this.accountsObservable.next(accs);
          this.accounts = accs;
          this.account = this.accounts[0];
          console.log(this.accounts);
        }

        this.ready = true;
      });
    }
  }
}
