import { JavaRouterModule } from './java-router.module';

describe('JavaRouterModule', () => {
  let javaRouterModule: JavaRouterModule;

  beforeEach(() => {
    javaRouterModule = new JavaRouterModule();
  });

  it('should create an instance', () => {
    expect(javaRouterModule).toBeTruthy();
  });
});
