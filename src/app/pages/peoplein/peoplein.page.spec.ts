import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PeopleinPage } from './peoplein.page';

describe('PeopleinPage', () => {
  let component: PeopleinPage;
  let fixture: ComponentFixture<PeopleinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
