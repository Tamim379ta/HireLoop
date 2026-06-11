import { createSubscriptions } from '@/lib/action/subcription';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { FiCheckCircle, FiMail } from 'react-icons/fi';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    const subInfo = {
      planId: metadata.planId,
      userEmail: customerEmail,
    }

    const result = await createSubscriptions(subInfo)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-10 flex flex-col items-center text-center gap-5">

          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <FiCheckCircle className="text-indigo-400 text-3xl" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">Payment Successful</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Your plan has been activated. Welcome aboard!
            </p>
          </div>

          <div className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-5 py-4 flex items-center gap-3">
            <FiMail className="text-zinc-400 shrink-0" />
            <p className="text-sm text-zinc-300 text-left">
              A confirmation email has been sent to{' '}
              <span className="text-white font-medium">{customerEmail}</span>
            </p>
          </div>

          <p className="text-xs text-zinc-500">
            Questions? Reach us at{' '}
            <a
              href="mailto:support@hireloop.com"
              className="text-indigo-400 hover:underline"
            >
              support@hireloop.com
            </a>
          </p>

          <a
            href="/dashboard"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold text-center transition-colors"
          >
            Go to Dashboard
          </a>

        </div>
      </div>
    );
  }
}