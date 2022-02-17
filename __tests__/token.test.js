import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import axiosMock from 'axios'
import Report from '../src/views/report';
import GenerateToken from '../src/views/generateToken';
import BASE_URL from '../utils/baseUrl'

jest.mock('axios')

describe('Report', () => {

    test("Generate report calls doneChange when generate report button is clicked", () => {
        const bill = { id: 1, meter: "119012", amount: "100" };
        const doneChange = jest.fn();
        const wrapper = render(<GenerateReport bill={bill} doneChange={doneChange} />);

        const p = wrapper.find(".submit");
        p.simulate("click");
        expect(doneChange).toBeCalledWith(1);
    });

})

describe('Test Case for Generate token Page', () => {
    test('Validate Generate report heading render', () => {
        const wrapper = render(
            <GenerateToken />
        );
        const linkElements = wrapper.queryAllByText('Electricity Token Generation');
        expect(linkElements).toHaveLength(1);
    });
});

describe('Test Case for Create Customer Page', () => {
    test('Validate Generate Button render', () => {
        const wrapper = render(
            <GenerateToken />

        );
        const linkElements = wrapper.queryAllByText('Generate');
        expect(linkElements).toHaveLength(1);
    });

});


const token = {
    amount: "1000",
    meter: "182092",
    username: "Shallon"
}

describe("Generate report with valid token views", () => {
    it("accepts token  props", () => {
        const wrapper = mount(<GenerateToken token={token} />);
        expect(wrapper.props().token).toEqual(token);
    });
    it("contains username ", () => {
        const wrapper = render(<GenerateToken token={token} />);
        const value = wrapper.findByLabelText("username").text();
        expect(value).toEqual("Shallon");
    });
    it("contains meter ", () => {
        const wrapper = render(<GenerateToken token={token} />);
        const value = wrapper.findByLabelText("meter").text();
        expect(value).toEqual("1000");
    });
});


describe("", () => {
    it('successful generating token', async () => {
        jest
            .spyOn(window, 'fetch')
            .mockResolvedValue({ json: () => ({ token: '123' }) });

        render(<GenerateToken />);

        const meterField = screen.getByRole('textbox', { name: 'meter' });
        const amountField = screen.getByLabelText('textbox', { name: 'amount' });
        const usernameField = screen.getByLabelText('textbox', { name: 'username' })
        const button = screen.find('.submit');

        // fill out and submit form
        fireEvent.change(meterField, { target: { value: '11987' } });
        fireEvent.change(amountField, { target: { value: '100' } });
        fireEvent.change(usernameField, { target: { value: 'Shallon' } });
        fireEvent.click(button);


        await waitFor(() => {
            expect(button).toBeInTheDocument();
            expect(meterField).toBeInTheDocument();
            expect(amountField).toBeInTheDocument();
            expect(usernameField).toBeInTheDocument();
        })
    });
})