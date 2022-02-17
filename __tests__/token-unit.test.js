
import React from 'react';
import { render } from '@testing-library/react';
import GenerateToken from '../src/views/generateToken';

describe('Generate token module', () => {
    it('matches snapshot', () => {
        const { container } = render(<GenerateToken />);
        expect(container.cloneNode(true)).toMatchSnapshot();
    });
})