import { CompanyService } from 'src/app/services/compny.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {
  constructor(private companyService: CompanyService) { }
  data: { id: number | null, name: string } = {id:null , name:""};

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.companyService.companySetSubject.subscribe((data: { id: number, name: string }) => {
    this.data.id=data.id
    this.data.name=data.name
    console.log(this.data);
    })
  }

  
}
