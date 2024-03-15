import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
declare var CrComLib: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular16App';

  // Find all buttons in the HTML rendered view and create a local reference.
  @ViewChildren('myButton') myButtons!: QueryList<ElementRef>;

  // Tasks to perform when our app (component) loads
  ngAfterViewInit() {
    // Loop over each button
    this.myButtons.forEach(button => {
      // Obtain the feedback Join number that was set as an HTML Attribute
      let fbJoin = button.nativeElement.getAttribute('fbJoin');
      // On initialisation get the current state of the button from the Control System.
      this.btnFb(CrComLib.getState('b', String(fbJoin)), button);
      // Subscribe for future changes to the button state.
      CrComLib.subscribeState('b', String(fbJoin), (v: any) => { this.btnFb(v, button); });
    });
  }

    // Digital press function
    btnPress(join: any) {
    CrComLib.publishEvent('b', String(join), true);
    CrComLib.publishEvent('b', String(join), false);
  }

    // Digital feedback function.
    btnFb(fb: boolean, button: ElementRef) { 
    button.nativeElement.classList.toggle('active', fb); 
  }
}
