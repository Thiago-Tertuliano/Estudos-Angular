import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  name = "Thiago";
  idButton = "111"
  
  //
  //meuBooleano = false;

  //atualizaBoleano(valor: boolean){
    //this.meuBooleano = valor;
  //} 

  submit(){
    console.log("video")
  }
}
