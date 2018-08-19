import {Component, Input, OnInit} from '@angular/core';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import {BehaviorSubject} from "rxjs/index";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @Input()
  private priceObservable: BehaviorSubject<number>;
  public payPalConfig?: PayPalConfig;

  ngOnInit(): void {
    this.priceObservable.subscribe(price => this.initConfig(price));
  }

  private initConfig(price): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AavkgQ4UPe7gPbjZK2Rb7FVnh79dnGHSD0dnMG70-jSNl_XJE8CNDDj8AgmtMLvx3YZ-A8jHTT-AhIfn'
        //sandbox: 'yourSandboxKey'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
        console.log(data);
        console.log(actions);
      },
      onError: (err) => {
        console.log('OnError');
        console.log(err);
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: price
        }
      }]
    });
  }
}
