import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardpayPage } from './cardpay.page';

describe('CardpayPage', () => {
  let component: CardpayPage;
  let fixture: ComponentFixture<CardpayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardpayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
