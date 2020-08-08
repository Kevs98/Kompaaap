import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagandoPage } from './pagando.page';

describe('PagandoPage', () => {
  let component: PagandoPage;
  let fixture: ComponentFixture<PagandoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagandoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
