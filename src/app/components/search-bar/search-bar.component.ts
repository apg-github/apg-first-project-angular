import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchInputRef') input: ElementRef<HTMLInputElement>;
  constructor(private router: Router) { }

  cleanInput(form: NgForm): void{
    form.value.search = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.value.search.trim() !== '') {
      this.router.navigate(['search', form.value.search]);
    }
  }

  handleHomeClick(): void {
    this.input.nativeElement.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
