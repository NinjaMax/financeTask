import { render, screen } from '@testing-library/react';
import App from './App';
import Main from './components/Main';
import NavBar from './components/NavBar';
import { mount } from 'enzyme';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it("render correctly component", () => {
  const TextInputComponent = render.create(<App />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});
it("render correctly component Main", () => {
  const TextInputComponent = render.create(<Main />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});

it("check month and years displayed", () => {
  const props = {
          showMonthYears: true
      },
      DateInputComponent = mount(<Main {...props} />).find(
          ".datepicker"
      );
  expect(DateInputComponent.hasClass("react-datepicker-hide-month")).toEqual(
      true
  );
});
it("render input correctly with null value", () => {
  const props = {
          value: null
      },
      DateInputComponent = mount(<NavBar {...props} />);
  expect(DateInputComponent.prop("value")).toEqual(null);
});
it("render quotes correctly with null value", () => {
  const props = {
          quotes: null
      },
      DataComponent = mount(<Main {...props} />);
  expect(DataComponent.prop("quotes")).toEqual(null);
});

