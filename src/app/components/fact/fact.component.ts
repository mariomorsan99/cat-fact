import { Component, OnInit } from '@angular/core';
import { FactService } from '../../providers/fact.service';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.css']
})
export class FactComponent implements OnInit {

  constructor(private factService: FactService) { }

  ngOnInit() {
    this.factService.GetFacts().subscribe(result=>{
      console.log(result);
    });
  }

}
