// @flow
// vendor
import * as React from 'react';
import { Form, Field } from 'react-final-form';
// custom
import { Layout, Content } from '../components';

type Props = {};
type State = {};

class ApplyVisaOnline extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props);
  }

  static defaultProps: Props = {};

  state = {};

  onSubmit = values => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  render() {
    return (
      <Layout>
        <Content>
          <Form
            onSubmit={this.onSubmit}
            initialValues={{ employed: true }}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>First Name</label>
                  <Field
                    name="firstName"
                    component="input"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <Field
                    name="lastName"
                    component="input"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label>Favorite Color</label>
                  <Field name="favoriteColor" component="select">
                    <option />
                    <option value="#ff0000">❤️ Red</option>
                    <option value="#00ff00">💚 Green</option>
                    <option value="#0000ff">💙 Blue</option>
                  </Field>
                </div>
                <div>
                  <label>Employed?</label>
                  <Field name="employed" component="input" type="checkbox" />
                </div>
                <div>
                  <label>Toppings</label>
                  <Field name="toppings" component="select" multiple>
                    <option value="ham">🐷 Ham</option>
                    <option value="mushrooms">🍄 Mushrooms</option>
                    <option value="cheese">🧀 Cheese</option>
                    <option value="chicken">🐓 Chicken</option>
                    <option value="pineapple">🍍 Pinapple</option>
                  </Field>
                </div>
                <div>
                  <label>Best Stooge?</label>
                  <div>
                    <label>
                      <Field
                        name="stooge"
                        component="input"
                        type="radio"
                        value="larry"
                      />{' '}
                      Larry
                    </label>
                    <label>
                      <Field
                        name="stooge"
                        component="input"
                        type="radio"
                        value="moe"
                      />{' '}
                      Moe
                    </label>
                    <label>
                      <Field
                        name="stooge"
                        component="input"
                        type="radio"
                        value="curly"
                      />{' '}
                      Curly
                    </label>
                  </div>
                </div>
                <div>
                  <label>Notes</label>
                  <Field
                    name="notes"
                    component="textarea"
                    placeholder="Notes"
                  />
                </div>
                <div className="buttons">
                  <button type="submit" disabled={submitting || pristine}>
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            )}
          />
        </Content>
      </Layout>
    );
  }
}

export default ApplyVisaOnline;
