import { ApiSlider } from '../types/admin';

interface SliderValues {
  [key: string]: number;
}

export class FormulaEvaluator {
  private sliders: ApiSlider[];
  private values: SliderValues;

  constructor(sliders: ApiSlider[], values: SliderValues) {
    this.sliders = sliders;
    this.values = values;
  }

  evaluateFormula(formula: string): number {
    let evaluatedFormula = formula;

    // Replace slider references with their values
    this.sliders.forEach(slider => {
      const value = this.values[slider.name] || slider.defaultValue;
      const regex = new RegExp(slider.name, 'g');
      evaluatedFormula = evaluatedFormula.replace(regex, value.toString());
    });

    try {
      // Use Function constructor to create a safe evaluation context
      const evalFunction = new Function(`return ${evaluatedFormula}`);
      return evalFunction();
    } catch (error) {
      console.error('Error evaluating formula:', error);
      return 0;
    }
  }

  static validateFormula(formula: string, sliderNames: string[]): boolean {
    try {
      // Replace all slider references with 1 for validation
      let testFormula = formula;
      sliderNames.forEach(name => {
        const regex = new RegExp(name, 'g');
        testFormula = testFormula.replace(regex, '1');
      });

      // Test evaluation
      new Function(`return ${testFormula}`)();
      return true;
    } catch (error) {
      return false;
    }
  }
}