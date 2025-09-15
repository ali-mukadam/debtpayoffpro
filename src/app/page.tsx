"use client";

import { useState, useMemo, useEffect } from "react";
import DebtInputForm from "@/components/DebtInputForm";
import PayoffChart from "@/components/PayoffChart";
import Logo from "@/components/Logo";
import { Debt, PayoffStrategy, calculatePayoff, PaymentScenario, calculateTotalDebt, calculateTotalMinimumPayment } from "@/utils/calculations";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  const [results, setResults] = useState<PaymentScenario[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [strategy, setStrategy] = useState<PayoffStrategy>(PayoffStrategy.AVALANCHE);
  const [totalDebt, setTotalDebt] = useState<number>(0);
  const [extraPayment, setExtraPayment] = useState<number>(0);
  const [originalDebts, setOriginalDebts] = useState<Debt[]>([]);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'privacy' | 'terms'>('home');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Enhanced stats calculation for hybrid approach
  const enhancedStats = useMemo(() => {
    if (!hasCalculated || results.length === 0 || originalDebts.length === 0) {
      return null;
    }
    
    const totalDebt = calculateTotalDebt(originalDebts);
    const totalInterest = results[results.length - 1].totalInterestPaid;
    const totalPayments = totalDebt + totalInterest;
    const monthlyPayment = calculateTotalMinimumPayment(originalDebts) + extraPayment;
    
    const currentDate = new Date();
    const payoffDate = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth() + results.length
    );
    const formattedPayoffDate = payoffDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
    const yearsMonths = `(or ${Math.floor(results.length / 12)} years${results.length % 12 > 0 ? ` and ${results.length % 12} months` : ''})`;
    
    const principalPercentage = parseFloat(((totalDebt / totalPayments) * 100).toFixed(2));
    const interestPercentage = parseFloat(((totalInterest / totalPayments) * 100).toFixed(2));
    
    return {
      totalPayments,
      monthlyPayment,
      formattedPayoffDate,
      yearsMonths,
      principalPercentage,
      interestPercentage,
      totalDebt,
      totalInterest
    };
  }, [hasCalculated, results, originalDebts, extraPayment]);

  const handleCalculation = (debts: Debt[], selectedStrategy: PayoffStrategy, extra: number) => {
    const scenarios = calculatePayoff(debts, selectedStrategy, extra);
    setResults(scenarios);
    setHasCalculated(true);
    setStrategy(selectedStrategy);
    setOriginalDebts(debts);
    setTotalDebt(debts.reduce((sum, debt) => sum + debt.balance, 0));
    setExtraPayment(extra);
  };

  // NEW: Scroll functions for footer buttons
  const scrollToCalculator = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const calculatorElement = document.querySelector('[data-calculator-section]');
      if (calculatorElement) {
        calculatorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToDebtStrategies = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const strategiesElement = document.querySelector('[data-strategies-section]');
      if (strategiesElement) {
        strategiesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // NEW: Header Component
  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('home')}>
              <Logo width={32} height={32} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              About
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-4">
              <button 
                onClick={() => {
                  setCurrentPage('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Calculator
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                About
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  // NEW: Footer Component
  const Footer = () => (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Logo width={24} height={24} textClassName="text-xl" />
            <p className="text-gray-600 text-sm mb-4 mt-2">
              Professional debt payoff calculator helping you become debt-free faster with proven strategies.
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure & Private
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={scrollToCalculator} className="text-gray-600 hover:text-blue-600 transition-colors">
                  Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="text-gray-600 hover:text-blue-600 transition-colors">
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={scrollToDebtStrategies} className="text-gray-600 hover:text-blue-600 transition-colors">
                  Debt Avalanche Guide
                </button>
              </li>
              <li>
                <button onClick={scrollToDebtStrategies} className="text-gray-600 hover:text-blue-600 transition-colors">
                  Snowball Method
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setCurrentPage('privacy')} className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('terms')} className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 DebtPayoffPro. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0">
              For educational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  // NEW: About Page
  const AboutPage = () => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
      const fetchAboutUs = async () => {
        try {
          setLoading(true);
          const response = await fetch('/aboutus.html');
          if (!response.ok) {
            throw new Error('Failed to fetch about us content');
          }
          const html = await response.text();
          setHtmlContent(html);
        } catch (err) {
          setError('Failed to load about us content');
          console.error('Error fetching about us content:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchAboutUs();
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <div className="text-center">
                <div className="text-lg text-gray-600">Loading about us...</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold mb-6" style={{ color: '#00509E' }}>About Us</h1>
              <div className="text-center text-red-600">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    );
  };

  // NEW: Privacy Policy Page
  const PrivacyPage = () => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
      const fetchPrivacyPolicy = async () => {
        try {
          setLoading(true);
          const response = await fetch('/policy.html');
          if (!response.ok) {
            throw new Error('Failed to fetch privacy policy');
          }
          const html = await response.text();
          setHtmlContent(html);
        } catch (err) {
          setError('Failed to load privacy policy');
          console.error('Error fetching privacy policy:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchPrivacyPolicy();
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <div className="text-center">
                <div className="text-lg text-gray-600">Loading privacy policy...</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold mb-6" style={{ color: '#00509E' }}>Privacy Policy</h1>
              <div className="text-center text-red-600">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    );
  };

  // NEW: Terms of Service Page  
  const TermsPage = () => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
      const fetchTermsOfService = async () => {
        try {
          setLoading(true);
          const response = await fetch('/termsofservice.html');
          if (!response.ok) {
            throw new Error('Failed to fetch terms of service');
          }
          const html = await response.text();
          setHtmlContent(html);
        } catch (err) {
          setError('Failed to load terms of service');
          console.error('Error fetching terms of service:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchTermsOfService();
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <div className="text-center">
                <div className="text-lg text-gray-600">Loading terms of service...</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold mb-6" style={{ color: '#00509E' }}>Terms of Service</h1>
              <div className="text-center text-red-600">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    );
  };

  // NEW: Educational Content Sections (PHASE 2 CONTENT ADDED HERE)
  const EducationalContent = () => (
    <div className="space-y-16 mt-16">
      {/* How to Use This Calculator */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#00509E' }}>
            How to Use This Calculator
          </h2>
          
          <div className="space-y-6" style={{ color: '#333333' }}>
            <p className="text-lg leading-relaxed">
              Our debt payoff calculator is designed to be simple and intuitive. Follow these easy steps to create your personalized debt elimination plan and see exactly how much money and time you can save.
            </p>

            <div className="grid gap-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  1. Enter Your Debt Information
                </h3>
                <p className="mb-2">
                  Start by adding each of your credit cards or debts. For each debt, enter the current balance, 
                  annual percentage rate (APR), and minimum monthly payment. You can add multiple debts using the &ldquo;Add Another Debt&rdquo; button.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Tip:</strong> You can find this information on your credit card statements or online account.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  2. Choose Your Payoff Strategy
                </h3>
                <p className="mb-2">
                  Select between the <strong>Debt Avalanche</strong> method (paying highest interest first) or 
                  <strong>Debt Snowball</strong> method (paying smallest balance first). Each strategy has different benefits 
                  for different personality types and financial goals.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  3. Add Extra Monthly Payment (Optional)
                </h3>
                <p className="mb-2">
                  If you can afford to pay more than the minimum payments, enter an additional amount. 
                  Even small extra payments can save you hundreds or thousands in interest and significantly reduce your payoff time.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> Adding just $50 extra per month can save you over $1,000 in interest on a $5,000 balance.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  4. Review Your Personalized Plan
                </h3>
                <p className="mb-2">
                  Click &ldquo;Calculate Payoff Plan&rdquo; to see your complete debt elimination strategy. You&rsquo;ll get a detailed breakdown 
                  including your payoff date, total interest savings, monthly payment schedule, and visual charts showing your progress.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h4 className="font-semibold mb-3" style={{ color: '#00509E' }}>💡 Pro Tips for Best Results</h4>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li>• <strong>Be accurate:</strong> Use your actual current balances and interest rates for the most precise calculations</li>
                <li>• <strong>Try different scenarios:</strong> Experiment with various extra payment amounts to find what works best for your budget</li>
                <li>• <strong>Compare strategies:</strong> Run calculations for both Avalanche and Snowball methods to see which saves you more money</li>
                <li>• <strong>Update regularly:</strong> Recalculate as you pay down debts or if your financial situation changes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Debt Avalanche vs Snowball Article */}
      <section className="max-w-4xl mx-auto" data-strategies-section>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#00509E' }}>
            Debt Avalanche vs Snowball: Which Strategy Saves More Money?
          </h2>
          
          <div className="space-y-6" style={{ color: '#333333' }}>
            <p className="text-lg leading-relaxed">
              When it comes to paying off multiple credit cards, choosing the right strategy can save you thousands of dollars. 
              Our calculator supports both the <strong>Debt Avalanche</strong> and <strong>Debt Snowball</strong> methods, 
              each with distinct advantages for different personality types and financial situations.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: '#00509E' }}>
              The Debt Avalanche Method: Maximum Savings
            </h3>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="mb-4">
                <strong>How it works:</strong> Pay minimum amounts on all debts, then put every extra dollar 
                toward the debt with the <em>highest interest rate</em> first.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">✅ Advantages:</h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Saves the most money on interest payments</li>
                    <li>• Mathematically optimal approach</li>
                    <li>• Faster overall debt elimination</li>
                    <li>• Recommended by financial experts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">❌ Drawbacks:</h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• May take longer to see first payoff</li>
                    <li>• Requires strong willpower</li>
                    <li>• Less psychological motivation</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4" style={{ color: '#00509E' }}>
              The Debt Snowball Method: Psychological Wins
            </h3>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <p className="mb-4">
                <strong>How it works:</strong> Pay minimum amounts on all debts, then put every extra dollar 
                toward the debt with the <em>smallest balance</em> first.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">✅ Advantages:</h4>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• Quick psychological wins</li>
                    <li>• Builds momentum and motivation</li>
                    <li>• Easier to stick with long-term</li>
                    <li>• Reduces number of monthly bills faster</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">❌ Drawbacks:</h4>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• Costs more in total interest</li>
                    <li>• Takes longer to become debt-free</li>
                    <li>• Not mathematically optimal</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 mt-8">
              <h4 className="font-semibold mb-3" style={{ color: '#FF9100' }}>💡 Pro Tip: Use Our Calculator to Compare</h4>
              <p className="text-orange-800">
                Try both strategies with your actual debt numbers using our calculator above. 
                You&rsquo;ll see exactly how much money and time each method will save you, 
                helping you make the best decision for your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Card Payoff Strategies */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#00509E' }}>
            5 Proven Strategies to Pay Off Credit Card Debt Faster
          </h2>
          
          <div className="space-y-8" style={{ color: '#333333' }}>
            <p className="text-lg leading-relaxed">
              Beyond choosing between avalanche and snowball methods, these additional strategies 
              can dramatically accelerate your journey to becoming debt-free.
            </p>

            <div className="grid gap-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  1. Make Extra Payments Every Month
                </h3>
                <p className="mb-2">
                  Even an extra $25-50 per month can save hundreds in interest. Use our calculator 
                  to see how different extra payment amounts impact your payoff timeline.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> On a $5,000 balance at 19% APR, adding $50/month saves $1,200 in interest.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  2. Apply Windfalls Immediately
                </h3>
                <p className="mb-2">
                  Tax refunds, bonuses, gifts, and side income should go straight to your highest-interest debt. 
                  These lump sum payments create massive acceleration in your payoff plan.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  3. Cut Expenses Temporarily
                </h3>
                <p className="mb-2">
                  Cancel subscriptions, eat out less, and find temporary savings. Even 3-6 months of 
                  aggressive cost-cutting can shave years off your debt payoff.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  4. Consider Balance Transfer Cards
                </h3>
                <p className="mb-2">
                  0% APR promotional periods can save thousands in interest, but only if you have 
                  discipline to pay off the balance before the promotion ends.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Warning:</strong> This strategy requires excellent credit and strong willpower.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00509E' }}>
                  5. Increase Your Income
                </h3>
                <p className="mb-2">
                  Side hustles, freelancing, or selling unused items can generate extra payments. 
                  Direct all additional income to debt elimination for maximum impact.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h4 className="font-semibold mb-3" style={{ color: '#00C853' }}>🎯 The Power of Combination</h4>
              <p className="text-green-800">
                The most successful debt elimination plans combine multiple strategies. Use our calculator 
                to model different scenarios and find the approach that works best for your budget and lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#00509E' }}>
            Frequently Asked Questions About Debt Payoff
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "Is this debt payoff calculator accurate?",
                answer: "Yes, our calculator uses the same mathematical formulas used by financial institutions. It accounts for compound interest, varying payment amounts, and different payoff strategies. However, results are estimates based on the assumption that you won't add new debt and will make payments consistently."
              },
              {
                question: "What's the difference between debt avalanche and debt snowball?",
                answer: "Debt avalanche targets your highest-interest debt first, saving you the most money overall. Debt snowball targets your smallest balance first, providing quicker psychological wins. Use our calculator to compare both strategies with your actual debt numbers."
              },
              {
                question: "Should I pay off credit cards or save money first?",
                answer: "Financial experts generally recommend paying off high-interest credit card debt (typically 15-25% APR) before focusing on savings, since you're unlikely to earn that much in a savings account. However, maintain a small emergency fund ($500-1000) to avoid creating new debt for unexpected expenses."
              },
              {
                question: "How much extra should I pay on my credit cards?",
                answer: "Even small extra payments make a big difference. Try our calculator with different extra payment amounts to see the impact. Start with whatever you can afford - even $25-50 extra per month can save hundreds in interest and months of payments."
              },
              {
                question: "Can I trust this calculator with my financial information?",
                answer: "Absolutely. All calculations happen locally in your browser - we never collect, store, or transmit your financial information to our servers. Your debt information stays completely private on your device."
              },
              {
                question: "What if I have other types of debt besides credit cards?",
                answer: "While our calculator is optimized for credit card debt, the same principles apply to personal loans, car loans (if you're upside down), and other high-interest consumer debt. For student loans and mortgages, consult with a financial advisor as the strategies may differ."
              },
              {
                question: "Should I close credit cards after paying them off?",
                answer: "Generally no. Keeping paid-off cards open (especially your oldest accounts) helps your credit score by maintaining your credit history length and improving your credit utilization ratio. Just avoid the temptation to use them again."
              },
              {
                question: "What if I can't afford the minimum payments?",
                answer: "Contact your credit card companies immediately to discuss hardship programs. Many offer temporary payment reductions or payment plans. Consider credit counseling from a nonprofit agency. Don't ignore the problem - it will only get worse with late fees and penalty interest rates."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full text-left p-6 font-semibold hover:bg-gray-50 transition-colors"
                  style={{ color: '#00509E' }}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <span>{faq.question}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold mb-2" style={{ color: '#00509E' }}>Still Have Questions?</h3>
            <p className="text-blue-800 text-sm">
              Our debt payoff calculator is designed to be comprehensive, but every financial situation is unique. 
              For personalized advice, consider consulting with a qualified financial advisor or credit counselor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  // NEW: Home Page Content (your existing calculator)
  const HomePage = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00509E' }}>
            Get Debt-Free Faster with Professional Strategies
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Use our advanced debt payoff calculator to create a personalized plan that saves you thousands in interest payments.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" style={{ color: '#00C853' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Private & Secure
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" style={{ color: '#00C853' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Professional Methods
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" style={{ color: '#00C853' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Multiple Debts Supported
            </div>
          </div>
        </div>

        {/* Calculator Section with Side-by-Side Layout */}
        <div data-calculator-section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Debt Input Form (Smaller Size) */}
            <div className="order-1 lg:order-1">
              <DebtInputForm onCalculate={handleCalculation} />
            </div>

            {/* Right Side - Payoff Plan Container (Always Visible) */}
            <div className="order-2 lg:order-2">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 font-inter" style={{ color: '#333333' }}>Your Payoff Plan</h2>
                
                {hasCalculated && enhancedStats ? (
                  <>
                    {/* Prominent Payoff Date Section */}
                    <div className="text-center mb-8 p-6 rounded-lg border border-blue-100" style={{ background: 'linear-gradient(135deg, #66A3FF 0%, #C8E6C9 100%)' }}>
                      <div className="text-gray-700 text-lg mb-2 font-inter">You will pay off your debt by</div>
                      <div className="text-3xl font-bold mb-1 font-inter" style={{ color: '#333333' }}>{enhancedStats.formattedPayoffDate}</div>
                      <div className="text-gray-600 font-inter">{enhancedStats.yearsMonths}</div>
                    </div>

                    {/* Enhanced Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 mb-8">
                      {/* Financial Details */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-inter" style={{ color: '#333333' }}>Number of payments:</span>
                          <span className="font-semibold font-inter" style={{ color: '#333333' }}>{results.length}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-inter" style={{ color: '#333333' }}>Estimated monthly payment:</span>
                          <span className="font-semibold font-inter" style={{ color: '#333333' }}>${enhancedStats.monthlyPayment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-inter" style={{ color: '#333333' }}>Total interest paid:</span>
                          <span className="font-semibold font-inter text-red-600">${enhancedStats.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-inter" style={{ color: '#333333' }}>Total payments:</span>
                          <span className="font-semibold font-inter" style={{ color: '#333333' }}>${enhancedStats.totalPayments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      </div>

                      {/* Principal and Interest Breakdown */}
                      <div className="flex flex-col items-center justify-center">
                        <h4 className="text-lg font-semibold mb-4 font-inter" style={{ color: '#333333' }}>Principal and Interest</h4>
                        
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 relative overflow-hidden">
                          <div 
                            className="absolute inset-0"
                            style={{ 
                              background: `conic-gradient(#00509E 0deg ${(enhancedStats.principalPercentage / 100) * 360}deg, #00C853 ${(enhancedStats.principalPercentage / 100) * 360}deg 360deg)` 
                            }}
                          ></div>
                          <div className="w-16 h-16 bg-white rounded-full z-10"></div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#00509E' }}></div>
                            <span className="font-inter" style={{ color: '#333333' }}>Principal paid:</span>
                            <span className="font-semibold font-inter" style={{ color: '#333333' }}>{enhancedStats.principalPercentage}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#00C853' }}></div>
                            <span className="font-inter" style={{ color: '#333333' }}>Interest paid:</span>
                            <span className="font-semibold font-inter" style={{ color: '#333333' }}>{enhancedStats.interestPercentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chart Section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 font-inter" style={{ color: '#333333' }}>Your Debt Payoff Journey</h3>
                      <div className="h-64">
                        <PayoffChart data={results} />
                      </div>
                    </div>

                    {/* Monthly Breakdown Table */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 font-inter" style={{ color: '#333333' }}>Monthly Breakdown</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse border border-gray-400">
                          <thead>
                            <tr style={{ backgroundColor: '#F4F4F4' }}>
                              <th className="border border-gray-400 px-4 py-3 text-left font-bold font-inter" style={{ color: '#333333' }}>Month</th>
                              <th className="border border-gray-400 px-4 py-3 text-left font-bold font-inter" style={{ color: '#333333' }}>Balance</th>
                              <th className="border border-gray-400 px-4 py-3 text-left font-bold font-inter" style={{ color: '#333333' }}>Interest</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.slice(0, 2).map((result) => (
                              <tr key={result.month} className="hover:bg-gray-50">
                                <td className="border border-gray-400 px-4 py-3 font-semibold font-inter" style={{ color: '#333333' }}>{result.month}</td>
                                <td className="border border-gray-400 px-4 py-3 font-semibold font-inter" style={{ color: '#333333' }}>
                                  ${result.remainingBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                </td>
                                <td className="border border-gray-400 px-4 py-3 font-semibold font-inter" style={{ color: '#333333' }}>
                                  ${result.interestThisMonth.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                </td>
                              </tr>
                            ))}
                            {results.length > 4 && (
                              <tr>
                                <td colSpan={3} className="border border-gray-400 px-4 py-3 text-center font-medium bg-gray-50 font-inter" style={{ color: '#9E9E9E' }}>
                                  ... {results.length - 4} more months
                                </td>
                              </tr>
                            )}
                            {results.slice(-2).map((result) => (
                              <tr key={result.month} className="hover:bg-gray-50">
                                <td className="border border-gray-400 px-4 py-3 font-semibold font-inter" style={{ color: '#333333' }}>{result.month}</td>
                                <td className="border border-gray-400 px-4 py-3 font-semibold font-inter" style={{ color: '#333333' }}>
                                  ${result.remainingBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                </td>
                                <td className="border border-gray-400 px-4 py-3 font-semibold font-inter" style={{ color: '#333333' }}>
                                  ${result.interestThisMonth.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Placeholder when no calculations made yet */
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-600 font-inter">Ready to Calculate</h3>
                    <p className="text-gray-500 mb-4 font-inter">Enter your debt information on the left to see your personalized payoff plan.</p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p className="font-inter">• Compare avalanche vs snowball strategies</p>
                      <p className="font-inter">• See total interest savings</p>
                      <p className="font-inter">• View detailed monthly breakdown</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* PHASE 2 EDUCATIONAL CONTENT ADDED HERE */}
        <EducationalContent />
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      
      {/* Page Router */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'privacy' && <PrivacyPage />}
      {currentPage === 'terms' && <TermsPage />}
      
      <Footer />
    </div>
  );
}
