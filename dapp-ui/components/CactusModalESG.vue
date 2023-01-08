<template>
  <div>
    <div :class="display ? 'modal-mask' : 'hidden none'">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3 style="color:#212529;">ESG Questionaire</h3>
          </div>
          <div class="modal-body">
            <form @submit="completeForm()">
              <div
                class="form-group"
                v-for="(question, index) in allQuestions"
                :key="index"
              >
                <label>{{ question }}</label>
                <input
                  v-if="questionTypesAndBoundaries[index].type === 'number'"
                  type="number"
                  :min="questionTypesAndBoundaries[index].min"
                  :max="questionTypesAndBoundaries[index].max"
                  v-model="allAnswers[index]"
                  class="form-control"
                  placeholder="0"
                  required
                />
                <input
                  v-else-if="
                    questionTypesAndBoundaries[index].type === 'boolean'
                  "
                  type="checkbox"
                  v-model="allAnswers[index]"
                  style="width: 2vw;"
                  class="form-control"
                />
                <select
                  v-else-if="
                    questionTypesAndBoundaries[index].type === 'select'
                  "
                  v-model="allAnswers[index]"
                  class="form-control"
                  required
                >
                  <option
                    v-for="(option, index) in questionTypesAndBoundaries[index]
                      .options"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <span
                  v-if="questionTypesAndBoundaries[index].type === 'boolean'"
                >
                  {{ allAnswers[index] ? 'Yes' : 'No' }}
                </span>
              </div>
              <!-- submit button -->
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success form-control">
                    Submit
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CactusModalESG',
  props: {
    display: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      questionTypesAndBoundaries: [
        { type: 'number', min: 0, max: 10000 },
        { type: 'number', min: 0, max: 100000 },
        { type: 'number', min: 0, max: 10 },
        { type: 'number', min: 0, max: 100000 },
        { type: 'number', min: 0, max: 7_000_000_000_000 },
        { type: 'boolean' },
        { type: 'boolean' },
        { type: 'boolean' },
        { type: 'boolean' },
        { type: 'boolean' },
        { type: 'boolean' },
        { type: 'boolean' },
        { type: 'boolean' },
        { type: 'boolean' },
        { type: 'number', min: 0, max: 10 },
        { type: 'select',
          options: ['ABSOLUTELY', "MAYBE", "NOT AT ALL"] },
        {
          type: 'select',
          options: ['AIR', 'LAND', 'WATER', 'PEOPLE', 'ANIMALS', 'OTHER'],
        },
        { type: 'number', min: 0, max: 100 },
      ],
      allQuestions: [
        'How many hours did you spend designing this project?',
        'How many hours do you estimate it will take to complete the project?',
        'From 1 to 10, how satisfied will you be in carrying out your project?',

        'How many people will it take to carry out your project?',
        'Give an estimate of how many people your project will affect directly and indirectly.',
        'Could your project serve as an inspiration to be carried out by other people?',

        'Will organizations or companies be directly or indirectly involved in your project?',
        'Do you have support from organizations (companies, schools, local communities)?',
        'Is your project against any activity/consequence carried out by a local organization?', // 9

        'Does your project bring any economic benefit (profit, cost reduction)?',
        'Can the project generate a new product, improvement, or model resulting in an economic value?',
        'Does your project have the support of local institutions (agencies, municipalities, associations)?',

        'Are there any laws or regulations involved with your project?',
        'Has there been a similar project in the place you want to implement your initiative?', // 14
        'For every ten people you talk about your project, how many would 100% approve it?',
        'If you showed your project to a politician, would you receive approval?',
        'What category does your project have the greatest impact on?',
        'If nothing is done about the problem that your project addresses, in how many years will the situation be irreversible?',
      ],
      vars: [
        'hoursDesign',
        'hoursComplete',
        'satisfaction',
        'peopleCarry',
        'peopleDirect',
        'peopleIndirect',
        'inspiration',
        'organizations',
        'support',
        'local',
        'economic',
        'product',
        'supportInstitution',
        'law',
        'location',
        'similar',
        'approval',
        'impact',
        'irreversible',
      ],
      allAnswers: [],
    }
  },
  mounted() {
  },
  methods: {
    completeForm() {
        event.preventDefault();
        console.log(this.allAnswers)
        let hex = '';
        for (let i = 0; i < this.allAnswers.length; i++) {
            if (this.questionTypesAndBoundaries[i].type === 'boolean') {
                hex += this.allAnswers[i] ? '1' : '0' + 'B'
            } else if (this.questionTypesAndBoundaries[i].type === 'number') {
                hex += this.allAnswers[i].toString(16) + 'A'
            } else if (this.questionTypesAndBoundaries[i].type === 'select') {
                hex += this.questionTypesAndBoundaries[i].options.indexOf(this.allAnswers[i]).toString(16) +'E'
            }
        }
        console.log(hex);
        this.$emit('completeEVR', hex);
    }
  },
}
</script>

<style scoped>
.form-group label {
  font-size: 1.2rem;
  font-weight: 500;
  color: black;
}

.modal-container {
  width: 1142px;
  margin: 22px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  max-height: 100vh;
  overflow: scroll;
  overflow-wrap: anywhere;
}

.form-group label {
  color: black !important;
}
</style>
