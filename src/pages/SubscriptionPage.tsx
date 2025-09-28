import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Unlock, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type PlanType = 'monthly' | 'yearly';
type SubscriptionTier = 'free' | 'premium';

interface PlanOption {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const SubscriptionPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [planType, setPlanType] = useState<PlanType>('monthly');
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(user?.subscription || 'free');

  const plans: Record<PlanType, PlanOption[]> = {
    monthly: [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        description: 'Basic access to interview experiences',
        features: [
          'View public interview experiences',
          'Follow companies',
          'Create and share your own experiences',
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 12.99,
        description: 'Full access to all premium content',
        features: [
          'Everything in Free plan',
          'Access to premium interview questions',
          'View and post comments on premium content',
          'Get personalized interview recommendations',
          'Early access to new features',
        ],
        popular: true
      }
    ],
    yearly: [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        description: 'Basic access to interview experiences',
        features: [
          'View public interview experiences',
          'Follow companies',
          'Create and share your own experiences',
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 99.99,
        description: 'Full access to all premium content (Save 36%)',
        features: [
          'Everything in Free plan',
          'Access to premium interview questions',
          'View and post comments on premium content',
          'Get personalized interview recommendations',
          'Early access to new features',
          'Priority support',
        ],
        popular: true
      }
    ]
  };

  const handleSubscribe = () => {
    if (selectedTier === 'free' || selectedTier === user?.subscription) {
      navigate('/profile');
      return;
    }

    // In a real app, this would connect to a payment processor
    toast({
      title: 'Subscription Updated!',
      description: `You are now subscribed to the ${selectedTier} plan.`,
    });

    // Simulate a delay
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="page-container animate-fade-in max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground">
            Get access to premium interview questions and experiences
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <RadioGroup
            className="flex gap-2 p-1 rounded-lg border"
            value={planType}
            onValueChange={(value) => setPlanType(value as PlanType)}
          >
            <div className="flex items-center">
              <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
              <Label
                htmlFor="monthly"
                className="flex px-3 py-2 rounded-md cursor-pointer peer-data-[state=checked]:bg-muted"
              >
                Monthly
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
              <Label
                htmlFor="yearly"
                className="flex px-3 py-2 rounded-md cursor-pointer peer-data-[state=checked]:bg-muted"
              >
                Yearly (Save 36%)
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {plans[planType].map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? 'border-primary shadow-md' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Popular
                </div>
              )}

              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground ml-1">
                      /{planType === 'monthly' ? 'mo' : 'year'}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.id === selectedTier ? "outline" : (plan.popular ? "default" : "secondary")}
                  onClick={() => setSelectedTier(plan.id as SubscriptionTier)}
                >
                  {plan.id === selectedTier
                    ? 'Current Plan'
                    : (plan.id === 'free' ? 'Downgrade' : 'Upgrade')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedTier !== user?.subscription && (
          <div className="bg-muted p-4 rounded-lg mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">You're about to change your subscription</p>
              <p className="text-muted-foreground text-sm">
                {selectedTier === 'premium'
                  ? 'Upgrading will give you immediate access to all premium features.'
                  : 'Downgrading will limit your access to premium content when your current billing period ends.'}
              </p>
            </div>
          </div>
        )}

        <Separator className="my-6" />

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Selected Plan: <span className="capitalize">{selectedTier}</span></h3>
            <p className="text-muted-foreground text-sm">
              {selectedTier === 'premium'
                ? `Billed ${planType === 'monthly' ? 'monthly' : 'yearly'} at $${plans[planType].find(p => p.id === 'premium')?.price}`
                : 'Free plan with limited features'}
            </p>
          </div>
          <Button
            onClick={handleSubscribe}
            disabled={selectedTier === user?.subscription}
          >
            {selectedTier === user?.subscription
              ? 'Current Plan'
              : selectedTier === 'premium' ? 'Upgrade Now' : 'Downgrade'}
          </Button>
        </div>

        <div className="mt-8 text-center">
          <div className="flex justify-center mb-2">
            <Unlock className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Premium Benefits</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Unlock access to thousands of premium interview questions and experiences from top companies like Google, Apple, Amazon, and more.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default SubscriptionPage;