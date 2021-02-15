import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestpushPage } from './testpush.page';

describe('TestpushPage', () => {
  let component: TestpushPage;
  let fixture: ComponentFixture<TestpushPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestpushPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestpushPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
