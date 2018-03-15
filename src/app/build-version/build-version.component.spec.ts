import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../app-material.module';
import { BuildVersionComponent } from './build-version.component';

describe('BuildVersionComponent', () => {
  let component: BuildVersionComponent;
  let fixture: ComponentFixture<BuildVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildVersionComponent ],
      imports: [
        AppMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
