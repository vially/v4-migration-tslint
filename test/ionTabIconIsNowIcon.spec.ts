import { ruleMessage, ruleName } from '../src/ionTabIconIsNowIconRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-tab icon="sdfg"></ion-tab>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when tabIcon is passed in', () => {
      let source = `
            @Component({
              template: \`
              <ion-tab tabIcon="sdfg"></ion-tab>
                       ~~~~~~~              
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });

    it('should fail when tabIcon is passed in', () => {
      let source = `
            @Component({
              template: \`
              <ion-tab tabIcon="sdfg">
                       ~~~~~~~ 
              </ion-tab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });
  });
});
