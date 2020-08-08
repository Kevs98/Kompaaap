import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PEfectivoPage } from './p-efectivo.page';

describe('PEfectivoPage', () => {
  let component: PEfectivoPage;
  let fixture: ComponentFixture<PEfectivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PEfectivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PEfectivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
