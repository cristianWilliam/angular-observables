import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Compra } from "./compra.model";

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinho: Compra[] = [];
  private produtoAdicionado$ = new BehaviorSubject<number>(0);

  obterQtdeCarrinho(){
    return this.produtoAdicionado$.asObservable();
  }

  adicionarProduto(produto: string) {
    const produtoCompra: Compra = {
      produto: produto,
      id: this.carrinho.length + 1,
    }
    
    this.carrinho.push(produtoCompra);
    this.produtoAdicionado$.next(this.carrinho.length);

    console.log(this.carrinho);
  }
}