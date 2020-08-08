import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KdashboardPage } from './kdashboard.page';

describe('KdashboardPage', () => {
  let component: KdashboardPage;
  let fixture: ComponentFixture<KdashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KdashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
