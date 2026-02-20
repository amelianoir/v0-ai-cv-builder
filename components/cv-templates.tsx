// Classic Template - Traditional CV format
export function ClassicTemplate() {
  return (
    <div className="w-full h-full bg-white text-black p-8 font-serif text-sm leading-relaxed space-y-4">
      <div className="border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold">JOHN ANDERSON</h1>
        <p className="text-gray-600">john@example.com | (555) 123-4567 | New York, NY</p>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-2 mb-2">Professional Summary</h2>
        <p className="text-xs text-gray-700">Results-driven professional with 8+ years of experience in digital strategy and team leadership.</p>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-2 mb-2">Experience</h2>
        <div className="space-y-2">
          <div>
            <div className="font-bold">Senior Manager - Digital Solutions</div>
            <div className="text-gray-600 text-xs">Tech Company Inc. | 2020 - Present</div>
            <ul className="text-xs text-gray-700 ml-4 list-disc">
              <li>Led cross-functional teams of 15+ people</li>
              <li>Increased revenue by 40% through digital transformation</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-2 mb-2">Education</h2>
        <div>
          <div className="font-bold">Master of Business Administration</div>
          <div className="text-xs text-gray-600">University of Example | 2015</div>
        </div>
      </div>
    </div>
  )
}

// Modern Template - Contemporary design
export function ModernTemplate() {
  return (
    <div className="w-full h-full bg-slate-50 text-slate-900 p-8 space-y-6">
      <div className="flex items-start justify-between border-l-4 border-blue-500 pl-4">
        <div>
          <h1 className="text-3xl font-bold">John Anderson</h1>
          <p className="text-blue-600 text-sm font-semibold">Senior Product Manager</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>Email: john@example.com</div>
        <div>Phone: (555) 123-4567</div>
        <div>Location: New York, NY</div>
        <div>LinkedIn: linkedin.com/in/john</div>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase text-blue-600 mb-3">About</h2>
        <p className="text-xs leading-relaxed">Innovative leader driving digital transformation across Fortune 500 companies.</p>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase text-blue-600 mb-3">Experience</h2>
        <div className="space-y-3">
          <div className="border-l-2 border-blue-300 pl-3">
            <div className="font-bold text-xs">Senior Manager</div>
            <div className="text-blue-600 text-xs">Tech Company Inc. • 2020 - Present</div>
            <p className="text-xs mt-1">Led strategic initiatives resulting in 40% revenue growth</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Minimal Template - Clean and simple
export function MinimalTemplate() {
  return (
    <div className="w-full h-full bg-white text-black p-8 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">John Anderson</h1>
        <p className="text-xs text-gray-600">Senior Product Manager • New York</p>
      </div>

      <div className="text-xs space-y-1">
        <div>john@example.com • (555) 123-4567</div>
        <div>linkedin.com/in/john</div>
      </div>

      <div>
        <p className="text-xs leading-relaxed text-gray-700">Digital transformation leader with proven track record scaling international teams and driving revenue growth.</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase mb-2">Experience</h2>
        <div className="text-xs space-y-2">
          <div>
            <div className="font-semibold">Senior Manager, Digital Solutions</div>
            <div className="text-gray-600">Tech Company Inc. • 2020-Present</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase mb-2">Skills</h2>
        <div className="text-xs text-gray-700">Leadership • Strategy • Digital • Analytics • Team Management</div>
      </div>
    </div>
  )
}

// Executive Template - Premium look
export function ExecutiveTemplate() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 space-y-6">
      <div className="border-b-2 border-amber-500 pb-4">
        <h1 className="text-3xl font-bold">JOHN ANDERSON</h1>
        <p className="text-amber-400 text-sm">Chief Strategy Officer • Executive Leader</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs text-gray-300">
        <div>john@example.com</div>
        <div>(555) 123-4567</div>
        <div>New York, NY</div>
        <div>linkedin.com/in/john</div>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase text-amber-400 mb-2">Executive Profile</h2>
        <p className="text-xs leading-relaxed text-gray-200">Strategic executive with 15+ years driving organizational transformation and revenue acceleration.</p>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase text-amber-400 mb-3">Leadership</h2>
        <div className="text-xs space-y-2 text-gray-200">
          <div>Senior Manager, Digital Solutions • Tech Company Inc. • 2020-Present</div>
        </div>
      </div>
    </div>
  )
}

// Tech-Focused Template
export function TechTemplate() {
  return (
    <div className="w-full h-full bg-white text-slate-900 p-8 space-y-4 font-mono text-xs">
      <div className="border-b-2 border-cyan-500 pb-4">
        <h1 className="text-2xl font-bold text-cyan-600">john_anderson</h1>
        <p className="text-cyan-600">&gt; Senior Product Manager • Digital Architect</p>
      </div>

      <div className="space-y-1 text-gray-600">
        <div>$ email john@example.com</div>
        <div>$ phone (555) 123-4567</div>
        <div>$ location New York, NY</div>
      </div>

      <div>
        <p className="text-cyan-600 font-bold">// About</p>
        <p className="text-xs mt-1">Full-stack leader in digital transformation, cloud architecture, and agile methodology.</p>
      </div>

      <div>
        <p className="text-cyan-600 font-bold">// Experience</p>
        <div className="mt-2 text-xs">
          <div className="text-cyan-600">&gt; Senior Manager @ Tech Company Inc</div>
          <div className="text-gray-600">  • Led teams of 20+</div>
          <div className="text-gray-600">  • 40% revenue growth</div>
        </div>
      </div>
    </div>
  )
}

// Creative Template
export function CreativeTemplate() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">John Anderson</h1>
        <p className="text-pink-300 text-sm">Creative Director & Innovation Leader</p>
      </div>

      <div className="flex gap-6 text-xs text-purple-200">
        <div>📧 john@example.com</div>
        <div>📱 (555) 123-4567</div>
        <div>📍 New York, NY</div>
      </div>

      <div>
        <h2 className="text-sm font-bold text-pink-300 mb-2">✦ About</h2>
        <p className="text-xs leading-relaxed text-purple-100">Visionary leader transforming industries through creative strategy and human-centered innovation.</p>
      </div>

      <div>
        <h2 className="text-sm font-bold text-pink-300 mb-3">✦ Experience</h2>
        <div className="text-xs space-y-2">
          <div className="bg-white/10 p-2 rounded">
            <div>Senior Manager • Tech Company Inc • 2020-Present</div>
            <div className="text-purple-200">Driving innovation across product strategy</div>
          </div>
        </div>
      </div>
    </div>
  )
}
