import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsercardPage } from './usercard.page';

describe('UsercardPage', () => {
  let component: UsercardPage;
  let fixture: ComponentFixture<UsercardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsercardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
