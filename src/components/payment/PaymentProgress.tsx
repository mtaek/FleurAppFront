'use client';

import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface PaymentProgressProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export default function PaymentProgress({ steps, currentStep, className = '' }: PaymentProgressProps) {
  return (
    <div className={`${className}`}>
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
              <>
                {/* Connector Line */}
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-0.5 w-full ${step.id < currentStep ? 'bg-gray-600' : 'bg-gray-200'}`} />
                  </div>
                )}
                
                <div className="relative flex items-center">
                  {step.id < currentStep ? (
                    // Completed Step
                    <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                  ) : step.id === currentStep ? (
                    // Current Step
                    <div className="h-6 w-6 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-gray-900" />
                    </div>
                  ) : (
                    // Future Step
                    <div className="h-6 w-6 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-gray-300" />
                    </div>
                  )}
                  
                  <div className="ml-3 min-w-0">
                    <p className={`text-xs font-medium ${
                      step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                    <p className={`text-xs ${
                      step.id <= currentStep ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}