import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleMessage, ruleName } from '../src/ionOverlayMethodCreateArgumentsChangedRule';
import { assertAnnotated, assertFailures, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with single object literal argument', () => {
      let source = `
      class DoSomething{
        constructor(private modalCtrl: ModalController){}

        doWork(){
          this.modalCtrl.create({
            component: ModalComponent,
            animated: true
          })
        }
      }
        `;
      assertSuccess(ruleName, source);
    });
  });

  const controllersList = ['ModalController', 'PopoverController'];

  for (let controller of controllersList) {
    describe(controller, () => {
      describe('failure', () => {
        it('should fail if called with more than one argument', () => {
          let source = `
      class DoSomething{
        constructor(private poorlyNamedController: ${controller}){}

        doWork(){
          this.poorlyNamedController.create(ModalComponent, someParams)
                                            ~~~~~~~~~~~~~~~~~~~~~~~~~~
        }
      }
        `;
          assertAnnotated({
            ruleName,
            message: ruleMessage,
            source
          });
        });
      });

      describe('replacements', () => {
        it('should replace single non object-literal argument', () => {
          let source = `
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create(MyComponent);
            }
          }
              `;

          const failures = assertFailures(ruleName, source, [
            {
              message: 'The create method of overlay controllers now accepts only one argument.',
              startPosition: {
                line: 5,
                character: 48
              },
              endPosition: {
                line: 5,
                character: 59
              }
            }
          ]);

          const fixes = failures.map(f => f.getFix());
          const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

          expect(res).to.eq(`
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create({component: MyComponent});
            }
          }
              `);
        });

        it('should replace two arguments', () => {
          let source = `
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create(MyComponent, someParams);
            }
          }
              `;

          const failures = assertFailures(ruleName, source, [
            {
              message: 'The create method of overlay controllers now accepts only one argument.',
              startPosition: {
                line: 5,
                character: 48
              },
              endPosition: {
                line: 5,
                character: 71
              }
            }
          ]);

          const fixes = failures.map(f => f.getFix());
          const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

          expect(res).to.eq(`
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create({component: MyComponent, componentProps: someParams});
            }
          }
              `);
        });

        it('should replace three arguments (non object-literal options)', () => {
          let source = `
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create(MyComponent, someParams, someOptions);
            }
          }
              `;

          const failures = assertFailures(ruleName, source, [
            {
              message: 'The create method of overlay controllers now accepts only one argument.',
              startPosition: {
                line: 5,
                character: 48
              },
              endPosition: {
                line: 5,
                character: 84
              }
            }
          ]);

          const fixes = failures.map(f => f.getFix());
          const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

          expect(res).to.eq(`
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create({component: MyComponent, componentProps: someParams, ...someOptions});
            }
          }
              `);
        });

        it('should replace three arguments (object-literal options)', () => {
          let source = `
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create(MyComponent, someParams, {foo: 'bar'});
            }
          }
              `;

          const failures = assertFailures(ruleName, source, [
            {
              message: 'The create method of overlay controllers now accepts only one argument.',
              startPosition: {
                line: 5,
                character: 48
              },
              endPosition: {
                line: 5,
                character: 85
              }
            }
          ]);

          const fixes = failures.map(f => f.getFix());
          const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

          expect(res).to.eq(`
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create({component: MyComponent, componentProps: someParams, foo: 'bar'});
            }
          }
              `);
        });

        it('should replace changed options (property assignment)', () => {
          let source = `
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create(MyComponent, someParams, {enableBackdropDismiss: false});
            }
          }
              `;

          const failures = assertFailures(ruleName, source, [
            {
              message: 'The create method of overlay controllers now accepts only one argument.',
              startPosition: {
                line: 5,
                character: 48
              },
              endPosition: {
                line: 5,
                character: 103
              }
            }
          ]);

          const fixes = failures.map(f => f.getFix());
          const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

          expect(res).to.eq(`
          class DoSomething{
            constructor(private poorlyNamedController: ${controller}){}

            doWork(){
              this.poorlyNamedController.create({component: MyComponent, componentProps: someParams, backdropDismiss: false});
            }
          }
              `);
        });

        it('should replace changed options (shorthand property assignment)', () => {
          let source = `
          class DoSomething{
            constructor(private overlayController: ${controller}){}

            doWork(){
              this.overlayController.create(MyComponent, someParams, {enableBackdropDismiss});
            }
          }
              `;

          const failures = assertFailures(ruleName, source, [
            {
              message: 'The create method of overlay controllers now accepts only one argument.',
              startPosition: {
                line: 5,
                character: 44
              },
              endPosition: {
                line: 5,
                character: 92
              }
            }
          ]);

          const fixes = failures.map(f => f.getFix());
          const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

          expect(res).to.eq(`
          class DoSomething{
            constructor(private overlayController: ${controller}){}

            doWork(){
              this.overlayController.create({component: MyComponent, componentProps: someParams, backdropDismiss: enableBackdropDismiss});
            }
          }
              `);
        });
      });
    });
  }
});
