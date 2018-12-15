import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleMessage, ruleName } from '../src/ionOverlayMethodDismissShouldUseAwaitRule';
import { assertAnnotated, assertFailures, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work when await exists in front of the onDidDismiss method', () => {
      let source = `
      class DoSomething {
        constructor(private modalCtrl: ModalController){}

        async doWork() {
          const ctrl = await this.modalCtrl.create({ component: ModalComponent });
          await ctrl.onDidDismiss();
        }
      }
        `;
      assertSuccess(ruleName, source);
    });

    it('should work when then() is used', () => {
      let source = `
      class DoSomething {
        constructor(private modalCtrl: ModalController){}

        async doWork() {
          const ctrl = await this.modalCtrl.create({ component: ModalComponent });
          ctrl.onDidDismiss().then(() => {});
        }
      }
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail if await is not present', () => {
      let source = `
      class DoSomething {
        constructor(private modalCtrl: ModalController){}

        async doWork() {
          const ctrl = await this.modalCtrl.create({ component: ModalComponent });
          ctrl.onDidDismiss();
          ~~~~~~~~~~~~~~~~~~~
        }
      }
        `;
      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });

    it('should fail if arguments are passed', () => {
      let source = `
      class DoSomething {
        constructor(private modalCtrl: ModalController){}

        async doWork() {
          const ctrl = await this.modalCtrl.create({ component: ModalComponent });
          await ctrl.onDidDismiss(someOptions);
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    it('should replace arrow function argument with promise syntax', () => {
      let source = `
      class DoSomething {
        constructor(private modalCtrl: ModalController){}

        async doWork() {
          const ctrl = await this.modalCtrl.create({ component: ModalComponent });
          ctrl.onDidDismiss(foo => {
            console.log('dismissed', foo);
          });
        }
      }
          `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'The onDidDismiss method of overlay controllers should use await.',
          startPosition: {
            line: 6,
            character: 10
          },
          endPosition: {
            line: 8,
            character: 12
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
      class DoSomething {
        constructor(private modalCtrl: ModalController){}

        async doWork() {
          const ctrl = await this.modalCtrl.create({ component: ModalComponent });
          ctrl.onDidDismiss().then(overlayResult => overlayResult.data).then(foo => {
            console.log('dismissed', foo);
          });
        }
      }
          `);
    });
  });
});
