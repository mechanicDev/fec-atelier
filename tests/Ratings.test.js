import axios from 'axios';
import React from 'react';
import 'regenerator-runtime/runtime.js';
import '@testing-library/jest-dom';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Fetch from 'fetch'
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';

import reviewData from './samples/sample-review-data.js';
import Ratings from '../client/src/components/Ratings/Ratings.jsx';
import RatingsList from '../client/src/components/Ratings/components/RatingsList.jsx';
import IndividualReview from '../client/src/components/Ratings/components/IndividualReview.jsx';

jest.mock('axios');

xdescribe('Ratings & Reviews', function() {
  describe('Render Ratings Component', function () {

    test('should Render the Ratings Component', function() {
      axios.get.mockResolvedValueOnce(reviewData);
      render(<Ratings />);
      const RatingsElement = screen.getByTestId('ratings');
      expect(RatingsElement).toBeInTheDocument();
    })

    test('should Render the Ratings List Component', function() {
      render(<RatingsList />);
      const RatingsListElement = screen.getByTestId('ratings-list');
      expect(RatingsListElement).toBeInTheDocument();
    })

    test('should Render the individual Review Component', function() {
      render(<IndividualReview />);
      const individualReviewElement = screen.getByTestId('individual-review');
      expect(individualReviewElement).toBeInTheDocument();
    })

  })
})
