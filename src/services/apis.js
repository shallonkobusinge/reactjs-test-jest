import React from 'react'
import axios from 'axios'
import BASE_URL from '../utils/baseUrl'
export async function getAllEmployeesForTheTable() {

    let employees = []
    await axios.get(`${BASE_URL}/employees`, { headers: authHeader() })
        .then((response) => {

            employees = response?.data?.data;

            return employees
        })
        .catch((error) => {

        })
    return employees

}

export async function getAllProductsForTheTable() {
    let products = []
    await axios.get(`${BASE_URL}/products`, { headers: authHeader() })
        .then((response) => {
            products = response?.data?.data
            return products
        }).catch((error) => { })
    return products
}