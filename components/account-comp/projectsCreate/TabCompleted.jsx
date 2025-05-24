import Link from 'next/link';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const TabCompleted = () => {
  return (
    <section className="step-body mt-4 text-center">
      <DotLottieReact
        src="https://lottie.host/744ae3cd-87fb-4a67-a1a0-e5f3ab39d00a/8lX3kMTs1m.lottie"
        loop
        autoplay
      />
      <h4 className="fw-bold">Food Donated!</h4>
      <p className="text-muted mt-2">
        Thank you for your generous donation! Your food will now be delivered to someone in need. Together, we’re reducing waste and feeding hope.
      </p>
      <div className="d-flex justify-content-center gap-1 mt-5">
        <button onClick={() => window.location.reload()} className="btn btn-light">
  Make New Donation
</button>


        <Link href="/account/general/projects/list" className="btn btn-primary">
  Preview Donations
</Link>

      </div>
    </section>
  );
};

export default TabCompleted;
