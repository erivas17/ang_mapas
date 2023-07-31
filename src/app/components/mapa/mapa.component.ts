import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar,
    public matDialog: MatDialog) {
    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores')!);
    }
   }

  ngOnInit(): void {
  }

  agregarMarcador(evento: any){
    const marcador = new Marcador(evento.coords.lat, evento.coords.lng);
    this.marcadores.push(marcador);

    this.guardarStorage();

    this.snackBar.open('Marcador agregado', 'Cerrar', {duration: 3000});
  }

  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador(index: number){
    this.marcadores.splice(index, 1);

    this.guardarStorage();

    this.snackBar.open('Marcador eliminado', 'Cerrar', {duration: 3000});
  }

  editarMarcador(marcador: Marcador){
    const dialogRef = this.matDialog.open(MapaEditarComponent,
      { data: {
          titulo: marcador.titulo,
          descripcion: marcador.descripcion,
        },
     });

     dialogRef.afterClosed().subscribe(result => {

      if(!result){
        return;
      }

      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;

      this.guardarStorage();

      this.snackBar.open('Marcador actualizado', 'Cerrar', {duration: 3000});
    });
  }
}
