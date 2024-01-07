import { render, screen } from "@testing-library/react"
import { expect, describe, it } from '@jest/globals';

import React from "react";
import '@testing-library/jest-dom';
import { Navbar } from "../navbar";


describe('Layout BoardID', () => {
    it('should have a BoardId page', () => {
        render(<Navbar />)

    })

    
})