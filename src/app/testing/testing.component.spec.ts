import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingComponent } from './testing.component';

describe('TestingComponent', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in an h1 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Default Title'
    );
  });

  it('should render input title in an h1 tag', () => {
    component.title = 'Hello Jest!';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hello Jest!');
  });

  it('should render subtitle when provided', () => {
    component.subtitle = 'This is a subtitle';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(
      'This is a subtitle'
    );
  });

  it('should not render subtitle if not provided', () => {
    component.subtitle = undefined; // Explicitly setting undefined
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p')).toBeFalsy();
  });

});
