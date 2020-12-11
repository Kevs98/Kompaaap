import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuperdetailsPage } from './superdetails.page';

describe('SuperdetailsPage', () => {
  let component: SuperdetailsPage;
  let fixture: ComponentFixture<SuperdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
