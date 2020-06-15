import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestcomponentsPage } from './testcomponents.page';

describe('TestcomponentsPage', () => {
  let component: TestcomponentsPage;
  let fixture: ComponentFixture<TestcomponentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcomponentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestcomponentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
