import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
export default function CampusAuthentication() {
  const navigate = useNavigate();
  const { login, user } = useContext(CartContext);
  useEffect(() => {
    if (user) {
      if (user.role === 'vendor') navigate('/vendor');
      else navigate('/menu');
    }
  }, [user, navigate]);
  const [email, setEmail] = React.useState('student@bahria.edu.pk');
  const [role, setRole] = React.useState('student');
  const [password, setPassword] = React.useState('password123');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });
      const data = await res.json();
      if(data.success) {
        login(data.user);
      if(data.user.role === 'vendor') { navigate('/vendor'); } else { navigate('/menu'); }
      } else {
        alert('Invalid credentials!');
      }
    } catch(err) { console.error(err); }
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex items-center justify-center p-4 sm:p-8">
      <main className="w-full max-w-md">
        <div className="flex flex-col w-full">
          <div className="relative w-full bg-surface-container-lowest rounded-xl shadow-xl p-8 sm:p-10 flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
<div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/5 pointer-events-none blur-xl"></div>
<div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-primary-fixed/30 pointer-events-none blur-lg"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-medium bg-surface-container-low px-2.5 py-1 rounded">
        terminal 07 • gate 2
      </span>
<span className="font-label-sm text-label-sm text-secondary">
        sys.v2.4
      </span>
</div>
<div className="flex flex-col gap-2">
<div className="flex items-baseline gap-1">
<h1 className="font-headline-lg text-headline-lg text-on-surface lowercase tracking-tight">
          campus food court
        </h1>
<span className="font-headline-lg text-headline-lg text-primary select-none">*</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
        Sign in with your university credentials to order meals or manage stalls.
      </p>
</div>
<div className="flex items-center gap-6 text-body-md pt-1">
<button onClick={() => { setRole('student'); setEmail('student@bahria.edu.pk'); }} className={"font-body-md relative pb-1.5 transition-colors focus:outline-none " + (role === 'student' ? 'text-on-surface font-semibold' : 'text-secondary hover:text-on-surface')} type="button">
        Student
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transition-all" id="indicator-student" style={{opacity: role === 'student' ? 1 : 0}}></span>
</button>
<span className="text-outline-variant font-label-sm select-none">|</span>
<button onClick={() => { setRole('vendor'); setEmail('vendor@bahria.edu.pk'); }} className={"font-body-md relative pb-1.5 transition-colors focus:outline-none " + (role === 'vendor' ? 'text-on-surface font-semibold' : 'text-secondary hover:text-on-surface')} type="button">
        Vendor
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transition-all opacity-0" id="indicator-vendor" style={{opacity: role === 'vendor' ? 1 : 0}}></span>
</button>
</div>
<div className="flex items-center justify-between bg-surface-container-low p-1 rounded-lg">
<button className="flex-1 py-1.5 text-center font-label-sm text-label-sm uppercase rounded bg-surface-container-lowest text-on-surface shadow-sm font-medium transition-all" id="tab-signin"  type="button">SIGN IN</button>
<button onClick={() => alert("Registration is currently managed via the University Central Portal.")} className="flex-1 py-1.5 text-center font-label-sm text-label-sm uppercase rounded text-secondary hover:text-on-surface transition-all" id="tab-register" type="button">
        Register
      </button>
</div>
<form className="flex flex-col gap-4 mt-1" >
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="campus-id" id="id-label">
          Student/Campus ID
        </label>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface placeholder:text-secondary/50 placeholder:font-headline-sm placeholder:italic text-body-md px-3.5 py-2.5 rounded-lg transition-colors focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_rgba(157,61,38,0.25)]" id="campus-id" placeholder="e.g. 02-134211-042" required="" type="text"/>
<span className="material-symbols-outlined text-secondary text-sm absolute right-3 pointer-events-none select-none">badge</span>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="campus-email">
          University Email
        </label>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface placeholder:text-secondary/50 placeholder:font-headline-sm placeholder:italic text-body-md px-3.5 py-2.5 rounded-lg transition-colors focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_rgba(157,61,38,0.25)]" id="campus-email" placeholder="omer.s@bahria.edu.pk" required="" type="email" value={email} onChange={e => setEmail(e.target.value)} />
<span className="material-symbols-outlined text-secondary text-sm absolute right-3 pointer-events-none select-none">alternate_email</span>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="password">
          Password
        </label>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface placeholder:text-secondary/50 text-body-md px-3.5 py-2.5 rounded-lg transition-colors focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_rgba(157,61,38,0.25)] tracking-widest" id="password" placeholder="••••••••••••" required="" type="password" value={password} onChange={e => setPassword(e.target.value)} />
<button aria-label="Toggle password view" className="absolute right-3 text-secondary hover:text-on-surface transition-colors p-0.5 focus:outline-none"  type="button">
<span className="material-symbols-outlined text-sm select-none" id="eye-icon">visibility_off</span>
</button>
</div>
</div>
<div className="flex items-center justify-between pt-1 text-body-sm">
<label className="inline-flex items-center gap-2 cursor-pointer select-none">
<input className="w-4 h-4 rounded text-primary bg-surface-container-low accent-primary cursor-pointer focus:ring-0" id="remember-me" type="checkbox"/>
<span className="font-body-sm text-body-sm text-secondary hover:text-on-surface transition-colors">
            Remember terminal
          </span>
</label>
<a className="font-body-sm text-body-sm text-primary hover:text-primary-container transition-colors underline-offset-4 hover:underline" href="#recover">
          Forgot credentials?
        </a>
</div>
<div className="pt-2">
<button onClick={handleLogin} className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 px-6 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-[0.99] flex items-center justify-center gap-2" id="submit-button" type="submit">
<span>[ Enter Food Court ]</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</form>
<div className="pt-4 mt-2 bg-surface-container-low/70 rounded-lg p-3.5 flex items-start gap-3">
<div className="mt-0.5 w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-primary text-base">contactless</span>
</div>
<div className="flex flex-col gap-0.5">
<p className="font-body-sm text-body-sm text-on-surface font-medium leading-tight">
          Physical pass verification
        </p>
<p className="font-body-sm text-body-sm text-secondary leading-normal">
          Fast NFC / Student Card tap available at physical kiosk 01–04.
        </p>
</div>
</div>
</div>

</div></main>
    </div>
  );
}
