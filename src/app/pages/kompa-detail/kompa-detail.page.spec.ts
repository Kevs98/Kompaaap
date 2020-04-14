import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KompaDetailPage } from './kompa-detail.page';

describe('KompaDetailPage', () => {
  let component: KompaDetailPage;
  let fixture: ComponentFixture<KompaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KompaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KompaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
