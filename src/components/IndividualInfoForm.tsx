import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { US_STATES } from '../utils/insuranceUtils';

interface IndividualInfo {
  age: number;
  annualSalary: number;
  zipCode: string;
  state: string;
}

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const formatCurrency = (value: string) => {
  const numberValue = parseFloat(value.replace(/[^0-9]/g, ''));
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(isNaN(numberValue) ? 0 : numberValue);
};

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({ individualInfo, handleIndividualInfoChange }) => {
  const [annualSalary, setAnnualSalary] = useState(formatCurrency(individualInfo.annualSalary.toString()));

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnnualSalary(value);
  };

  const handleSalaryBlur = () => {
    const formattedSalary = formatCurrency(annualSalary);
    setAnnualSalary(formattedSalary);
    handleIndividualInfoChange({
      target: {
        name: 'annualSalary',
        value: formattedSalary.replace(/[^0-9]/g, ''),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="text-xl font-bold">Individual Information</CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="space-y-2 md:w-40">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={individualInfo.age}
              onChange={handleIndividualInfoChange}
              placeholder="Age"
              className="w-full"
              maxLength={2}
            />
          </div>
          <div className="space-y-2 md:w-40">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={individualInfo.zipCode}
              onChange={handleIndividualInfoChange}
              placeholder="Zip Code"
              className="w-full"
              maxLength={5}
            />
          </div>
          <div className="space-y-2 md:w-40">
            <Label htmlFor="annualSalary">Annual Salary</Label>
            <Input
              id="annualSalary"
              name="annualSalary"
              type="text"
              value={annualSalary}
              onChange={handleSalaryChange}
              onBlur={handleSalaryBlur}
              placeholder="Annual Salary"
              className="w-full"
              maxLength={10}
            />
          </div>
          <div className="space-y-2 md:w-40">
            <Label htmlFor="state">State</Label>
            <Select
              id="state"
              value={individualInfo.state}
              onValueChange={(value) => handleIndividualInfoChange({ target: { name: 'state', value } } as React.ChangeEvent<HTMLSelectElement>)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 py-2 px-3"
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndividualInfoForm;
