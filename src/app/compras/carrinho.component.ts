import { Component, OnDestroy, inject } from "@angular/core";
import { Subscription, take } from "rxjs";
import { CarrinhoService } from "./carrinho.service";

@Component({
  selector: 'app-carrinho',
  standalone: true,
  template: `
    <span> Qtde Carrinho: </span>
    <span> {{ qtdeProdutos }} </span>
  `
})
export class CarrinhoComponent implements OnDestroy {
  carrinhoService = inject(CarrinhoService);
  qtdeCarrinho$ = this.carrinhoService.obterQtdeCarrinho();

  qtdeProdutos = 0;
  sub = new Subscription();

  constructor(){
    const subContador = this.qtdeCarrinho$
      .pipe(
        take(1))
      .subscribe(qtde => {
        console.log('VALOR EMITIDO', qtde);
        this.qtdeProdutos = qtde
      });

    this.sub.add(subContador);
  }

  ngOnDestroy(): void {
    console.log('CARRINHO DESTRUIDO!');
    this.sub.unsubscribe
  }
}