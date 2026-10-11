// ============================================================
// Educational Concept Explanations & Deep Review Service
// Provides structured, scientifically verified EAPCET learning
// breakdowns for each question.
// ============================================================

export interface ConceptBreakdown {
  concept: string;
  principle: string;
  formula: string;
  steps: string[];
  whyCorrect: string;
  distractorNotes: string;
  examTip: string;
}

const WE_POWER_BREAKDOWNS: Record<string, ConceptBreakdown> = {
  'wep-001': {
    concept: 'Dot Product of Orthogonal Vectors',
    principle: 'The scalar (dot) product of two vectors is zero if and only if they are mutually perpendicular (orthogonal) or at least one is a zero vector.',
    formula: 'P · Q = |P| |Q| cos θ  ⟹  cos θ = (P · Q) / (|P| |Q|)',
    steps: [
      'Given P = 5î + 2ĵ + 4k̂ and Q = 2î – 5ĵ + 0k̂.',
      'Multiply corresponding Cartesian components: (5)(2) + (2)(-5) + (4)(0).',
      'Compute algebraic sum: 10 - 10 + 0 = 0.',
      'Since P · Q = 0 and neither vector has zero magnitude, cos θ = 0  ⟹  θ = 90°.'
    ],
    whyCorrect: 'A zero dot product indicates cos θ = 0, which corresponds to an angle of 90° (perpendicular vectors).',
    distractorNotes: 'Option (A) 0° would require P and Q to be parallel (P · Q = |P||Q|). Option (C) 180° requires anti-parallel vectors (P · Q = -|P||Q|). Option (B) 45° would require cos θ = 1/√2.',
    examTip: 'Whenever asked for the angle between two vectors in EAPCET, always compute the dot product first. If it yields 0, the answer is immediately 90° without needing to calculate vector magnitudes.'
  },
  'wep-002': {
    concept: 'Orthogonality Condition for 2D Vectors',
    principle: 'For a 2D vector A = aî + bĵ, any perpendicular vector B = cî + dĵ satisfies ac + bd = 0.',
    formula: 'A · B = Ax Bx + Ay By = 0',
    steps: [
      'Target vector: A = î + 2ĵ.',
      'Test option (A) 4î + 3ĵ: (1)(4) + (2)(3) = 10 ≠ 0.',
      'Test option (B) 6î - 3ĵ: (1)(6) + (2)(-3) = 6 - 6 = 0 (Orthogonal!).',
      'Magnitude of option (B): √(6² + (-3)²) = √45 = 3√5 units.',
      'Test options (C) and (D): neither gives a zero dot product.'
    ],
    whyCorrect: 'Option (B) 6î - 3ĵ yields a dot product of exactly zero with (î + 2ĵ), proving orthogonality.',
    distractorNotes: 'Option (A) 4î + 3ĵ gives a positive dot product (acute angle). Option (D) 2î + ĵ gives (1)(2)+(2)(1)=4 ≠ 0.',
    examTip: 'A quick shortcut: any vector perpendicular to (aî + bĵ) is of the form k(-bî + aĵ) or k(bî - aĵ). Here, taking k = -3 gives -3(-2î + î) = 6î - 3ĵ.'
  },
  'wep-003': {
    concept: 'Vector Projections and Direction Cosines',
    principle: 'The scalar projection (component) of vector A along vector B is A cos θ, and the projection of B along A is B cos θ.',
    formula: 'Component of A along B = A cos θ; Component of B along A = B cos θ',
    steps: [
      'Component of A along B = A cos θ.',
      'Component of B along A = B cos θ.',
      'Given: A cos θ = √3 (B cos θ).',
      'Divide both sides by cos θ (assuming non-zero component, cos θ ≠ 0): A = √3 B.',
      'The ratio of magnitudes A : B = √3 : 1.'
    ],
    whyCorrect: 'Because cos θ cancels out from both sides, the ratio of their components directly equals the ratio of their magnitudes.',
    distractorNotes: 'Option (A) 1 : √3 is the reciprocal (B : A). Option (C) 1 : 1 assumes equal projections. Option (D) 3 : 1 mistakenly squares the ratio.',
    examTip: 'Be very careful about which vector is in the numerator versus denominator in ratio problems. The question asks for A : B, which is √3 : 1.'
  },
  'wep-004': {
    concept: 'Difference vs Sum of Unit Vectors and Half-Angle Identity',
    principle: 'For unit vectors |A| = |B| = 1, expanding magnitudes of sum and difference produces functions of cos θ that simplify via half-angle trigonometric formulas.',
    formula: '|A - B|² = 2(1 - cos θ) = 4 sin²(θ/2); |A + B|² = 2(1 + cos θ) = 4 cos²(θ/2)',
    steps: [
      '|A - B|² = |A|² + |B|² - 2(A · B) = 1 + 1 - 2 cos θ = 2(1 - cos θ).',
      '|A + B|² = |A|² + |B|² + 2(A · B) = 1 + 1 + 2 cos θ = 2(1 + cos θ).',
      'Ratio: |A - B|² / |A + B|² = [2(1 - cos θ)] / [2(1 + cos θ)].',
      'Using trigonometric identities: 1 - cos θ = 2 sin²(θ/2) and 1 + cos θ = 2 cos²(θ/2).',
      'Ratio = [2 sin²(θ/2)] / [2 cos²(θ/2)] = tan²(θ/2).'
    ],
    whyCorrect: 'The ratio of 1 - cos θ to 1 + cos θ reduces directly to the square of tangent of the half-angle.',
    distractorNotes: 'Option (D) cot²(θ/2) is the inverse ratio |A + B|² / |A - B|². Options (B) and (C) miss the ratio division.',
    examTip: 'Remember the standard identities: |A - B| = 2 sin(θ/2) and |A + B| = 2 cos(θ/2) for unit vectors. Dividing them immediately gives tan(θ/2).'
  },
  'wep-005': {
    concept: 'Total Work Done as Mechanical Energy Gain',
    principle: 'By the Work-Energy Theorem, the total external work done on a body equals the sum of its potential energy gained and kinetic energy gained.',
    formula: 'W_total = ΔU + ΔK = mgh + ½ m v²',
    steps: [
      'Given: mass m = 10 kg, height h = 10 m, velocity v = 2 m/s, g = 9.8 m/s².',
      'Potential Energy gain: ΔU = mgh = 10 × 9.8 × 10 = 980 J.',
      'Kinetic Energy gain: ΔK = ½ m v² = ½ × 10 × (2)² = ½ × 10 × 4 = 20 J.',
      'Total work done = 980 J + 20 J = 1000 J.'
    ],
    whyCorrect: 'External work must overcome gravity (980 J) and simultaneously impart motion (20 J), giving 1000 J.',
    distractorNotes: 'Option (A) 980 J accounts only for gravitational PE, ignoring KE. Option (B) 20 J accounts only for KE. Option (C) 960 J subtracts KE instead of adding.',
    examTip: 'Always read whether the object is lifted at constant velocity or given a final velocity. Here final velocity is 2 m/s, so both PE and KE must be summed.'
  },
  'wep-006': {
    concept: 'Work Done in Raising Mass with a Heavy Rope',
    principle: 'When lifting a load using a heavy rope, work is done against gravity on both the concentrated load (bucket) and the distributed mass of the rope acting at its center of gravity.',
    formula: 'W = m_bucket g h + m_rope g (h / 2)',
    steps: [
      'Depth of well h = 20 m; bucket mass m_bucket = 20 kg; linear density λ = 0.2 kg/m; g = 10 m/s².',
      'Total mass of rope: m_rope = λ × h = 0.2 × 20 = 4 kg.',
      'Work to lift bucket: W_bucket = m_bucket × g × h = 20 × 10 × 20 = 4000 J.',
      'Work to lift rope: CG of rope moves through distance h/2 = 10 m.',
      'W_rope = m_rope × g × (h/2) = 4 × 10 × 10 = 400 J.',
      'Total work = 4000 J + 400 J = 4400 J.'
    ],
    whyCorrect: 'Total work includes 4000 J for the bucket plus 400 J for raising the rope center of mass, totaling 4400 J.',
    distractorNotes: 'Option (A) 4000 J ignores the rope mass completely. Option (B) 4040 J mistakenly uses h/20 or miscalculates rope CG.',
    examTip: 'For any uniform hanging rope or chain of length L, its center of mass is at L/2 below the top. Lifting it completely requires work = M g (L/2).'
  },
  'wep-007': {
    concept: 'Work Done in Pulling a Hanging Chain onto a Table',
    principle: 'Only the hanging portion of the chain requires work to be pulled onto the table. That work equals the gravitational potential energy needed to lift its center of mass to the table surface.',
    formula: 'W = M_hanging × g × (L_hanging / 2) = (M g L) / (2 n²), where 1/n is the hanging fraction',
    steps: [
      'Total length L = 2 m, total mass M = 4 kg, g = 10 m/s².',
      'Hanging length L_h = 60 cm = 0.6 m.',
      'Hanging fraction: 1/n = 0.6 / 2 = 3/10.',
      'Mass of hanging part: M_h = (3/10) × 4 kg = 1.2 kg.',
      'Center of mass of hanging part is at distance L_h / 2 = 0.6 / 2 = 0.3 m below the edge.',
      'Work done W = M_h × g × (L_h / 2) = 1.2 × 10 × 0.3 = 3.6 J.'
    ],
    whyCorrect: 'Lifting 1.2 kg through its center of gravity displacement (0.3 m) against 10 m/s² gravity requires exactly 3.6 J.',
    distractorNotes: 'Option (A) 7.2 J mistakenly uses the full hanging length 0.6 m instead of its center of mass (0.3 m). Options (C) and (D) fail to use the hanging fraction.',
    examTip: 'Remember the formula W = M g L / (2n²). Here n = 2 / 0.6 = 10/3. W = 4 × 10 × 2 / [2 × (100/9)] = 80 / (200/9) = 3.6 J.'
  },
  'wep-008': {
    concept: 'Work Done in Reorienting a Rigid Body',
    principle: 'The work done against gravity in altering the orientation of a block on horizontal ground equals the increase in potential energy: W = mg(h_CG,final - h_CG,initial).',
    formula: 'W = M g (h_f - h_i)',
    steps: [
      'Block dimensions: 6 m × 4 m × 2 m. Volume V = 6 × 4 × 2 = 48 m³.',
      'Density ρ = 1.5 g/cm³ = 1500 kg/m³.',
      'Mass M = V × ρ = 48 × 1500 = 72,000 kg.',
      'Largest face in contact (6m × 4m) ⟹ height is 2 m ⟹ initial CG height h_i = 2 / 2 = 1 m.',
      'Smallest face in contact (4m × 2m) ⟹ height is 6 m ⟹ final CG height h_f = 6 / 2 = 3 m.',
      'Height shift Δh = 3 m - 1 m = 2 m.',
      'W = 72,000 × 10 × 2 = 1,440,000 J = 1440 kJ.'
    ],
    whyCorrect: 'The center of gravity is raised by 2 meters, requiring 72,000 kg × 10 m/s² × 2 m = 1440 kJ.',
    distractorNotes: 'Option (A) 2880 kJ uses Δh = 4 m. Option (D) 720 kJ uses Δh = 1 m. Option (C) 3800 kJ is an arithmetic error.',
    examTip: 'The height of the Center of Gravity of a rectangular block lying flat is always half of its vertical dimension.'
  },
  'wep-009': {
    concept: 'Newtonian Dynamics and Work-Energy Equivalence',
    principle: 'Constant force yields constant acceleration. Work done by the force can be calculated either via F · s or by the change in kinetic energy ½m(v² - u²).',
    formula: 'a = F/m; t = (v - u)/a; s = (v² - u²)/(2a); W = F s = ΔK',
    steps: [
      'Given m = 5 kg, u = 4 m/s, v = 8 m/s, F = 10 N.',
      'Acceleration: a = F / m = 10 / 5 = 2 m/s².',
      'Time taken: t = (v - u) / a = (8 - 4) / 2 = 2 s ⟹ Statement (C) is correct.',
      'Displacement: s = (v² - u²) / (2a) = (64 - 16) / 4 = 48 / 4 = 12 m ⟹ Statement (B) is correct.',
      'Work done: W = F × s = 10 × 12 = 120 J (or ΔK = ½(5)(64 - 16) = 120 J) ⟹ Statement (A) is correct.',
      'Since statements (A), (B), and (C) are all valid, (D) All of the above is correct.'
    ],
    whyCorrect: 'Every individual assertion (Work = 120 J, Displacement = 12 m, Time = 2 s) is mathematically verified.',
    distractorNotes: 'Selecting only (A), (B), or (C) is incomplete because all three statements are simultaneously true.',
    examTip: 'When an option says "All of the above", verify at least two independent calculations. If two are true, the answer must be "All of the above".'
  },
  'wep-010': {
    concept: 'Work Done in Tilting a Uniform Rod',
    principle: 'When raising one end of a uniform rod of length L pivoted at the other end, its center of mass is located at L/2 from the pivot and rises by (L/2) sin θ.',
    formula: 'W = m g h_CG = m g (L / 2) sin θ',
    steps: [
      'Given: rod length L = 2 m, mass m = 5 kg, angle θ = 30°, g = 10 m/s².',
      'The center of gravity is at mid-length: L/2 = 2 / 2 = 1 m from the pivot.',
      'Height gained by CG: h_CG = (L/2) sin 30° = 1 × 0.5 = 0.5 m.',
      'Work done W = m g h_CG = 5 × 10 × 0.5 = 25 J.'
    ],
    whyCorrect: 'Center of gravity rises by 0.5 m, requiring W = 5 × 10 × 0.5 = 25 J.',
    distractorNotes: 'Option (B) 50 J uses the height of the end point (L sin 30° = 1 m) instead of the center of mass. Options (C) and (D) mistakenly use cos 30° = √3/2.',
    examTip: 'In gravity problems with extended rigid bodies, work done is ALWAYS m g Δh_CG. Do not use the displacement of the highest point.'
  },
  'wep-011': {
    concept: 'Work Done by a 1D Variable Force',
    principle: 'Work done by a position-dependent force F(x) along a line is obtained by integrating F(x) with respect to position x between the initial and final coordinates.',
    formula: 'W = ∫ F(x) dx from x₁ to x₂',
    steps: [
      'Given F(x) = 4x² + 3x, limits from x = 2 m to x = 3 m.',
      'Indefinite integral: ∫ (4x² + 3x) dx = (4/3)x³ + (3/2)x².',
      'Evaluate at x = 3: (4/3)(27) + (3/2)(9) = 36 + 13.5 = 49.5 J.',
      'Evaluate at x = 2: (4/3)(8) + (3/2)(4) = 32/3 + 6 = 10.67 + 6 = 16.67 J.',
      'Subtract: W = 49.5 - 16.67 = 32.83 J ≈ 32.8 J.'
    ],
    whyCorrect: 'Evaluating the definite integral [(4/3)x³ + (3/2)x²] from 2 to 3 gives 76/3 + 15/2 = 197/6 ≈ 32.83 J.',
    distractorNotes: 'Options (B) and (C) differ by orders of magnitude (decimal point shift). Option (D) would require equal positive and negative areas.',
    examTip: 'Calculate fractions directly: (4/3)(27 - 8) + (3/2)(9 - 4) = (4/3)(19) + (3/2)(5) = 76/3 + 15/2 = 197/6 ≈ 32.83 J.'
  },
  'wep-012': {
    concept: 'Work Done in the n-th Second of Motion',
    principle: 'Distance traveled in the n-th second under constant acceleration from rest is S_n = u + ½a(2n - 1). Work done during that second is W_n = F · S_n.',
    formula: 'S_n = u + ½a(2n - 1); W_n = F × S_n',
    steps: [
      'Given: mass m = 20 kg, force F = 5 N, u = 0, n = 3 (3rd second).',
      'Acceleration: a = F / m = 5 / 20 = 0.25 m/s² = 1/4 m/s².',
      'Distance in 3rd second: S₃ = 0 + ½(1/4)(2 × 3 - 1) = ½(1/4)(5) = 5/8 m.',
      'Work done in 3rd second: W = F × S₃ = 5 × (5/8) = 25/8 J.'
    ],
    whyCorrect: 'Force (5 N) multiplied by displacement during the 3rd second (5/8 m) equals 25/8 J.',
    distractorNotes: 'Option (B) 25/4 J mistakenly doubles the distance. Option (D) 25 J uses total displacement across multiple seconds.',
    examTip: 'Distinguish carefully between "work done IN the 3rd second" (displacement during that 1-second interval) versus "work done in 3 seconds" (total displacement from t=0 to 3).'
  },
  'wep-013': {
    concept: 'Hooke\'s Law and Spring Potential Energy',
    principle: 'The spring constant k is the ratio of force to deformation. The elastic potential energy stored in stretching the spring by distance x is ½kx².',
    formula: 'k = F / x; W = ½ k x²',
    steps: [
      'Given: F = 10 N stretches spring by x₁ = 1 mm = 10⁻³ m.',
      'Spring constant: k = 10 / (10⁻³) = 10,000 N/m = 10⁴ N/m.',
      'Target extension: x₂ = 40 mm = 40 × 10⁻³ m = 0.04 m.',
      'Work done: W = ½ k x₂² = ½ × (10⁴) × (0.04)² = ½ × 10⁴ × 0.0016 = 8 J.'
    ],
    whyCorrect: 'With k = 10,000 N/m, ½ × 10,000 × (0.04)² = 8 Joules.',
    distractorNotes: 'Options (A), (B), and (C) result from failing to convert millimeters to meters before squaring.',
    examTip: 'Always convert deformation units to SI (meters) before applying ½kx², because (40 mm)² in mm² gives 1600, leading to huge factor errors if unconverted.'
  },
  'wep-014': {
    concept: 'Definite Integration of Polynomial Force',
    principle: 'Work is the definite integral of a variable polynomial force F(x) = a + bx + cx² over a given displacement interval.',
    formula: 'W = ∫₀⁵ (7 - 2x + 3x²) dx',
    steps: [
      'Given F(x) = 7 - 2x + 3x² from x = 0 to x = 5 m.',
      'Anti-derivative: ∫ (7 - 2x + 3x²) dx = [7x - x² + x³].',
      'At upper limit x = 5: 7(5) - (5)² + (5)³ = 35 - 25 + 125 = 135 J.',
      'At lower limit x = 0: 0 J.',
      'Total work done = 135 - 0 = 135 J.'
    ],
    whyCorrect: 'Direct term-by-term integration yields 35 - 25 + 125 = 135 Joules.',
    distractorNotes: 'Option (B) 270 J is double the answer. Option (A) 70 J omits the x³ cubic term (35 - 25 + 60?).',
    examTip: 'Notice the mass (2 kg) given in the problem is extra information! Work done depends strictly on force and displacement (W = ∫F dx), not mass.'
  },
  'wep-015': {
    concept: 'Work Done Lifting an Immersed Body in a Fluid',
    principle: 'When an object is submerged in water, buoyant force reduces its effective downward force to apparent weight = mg(1 - ρ_fluid / ρ_body).',
    formula: 'F_net = mg (1 - 1 / RD); W = F_net × h',
    steps: [
      'Given: mass m = 20 kg, relative density RD = 3.2, height h = 8 m, g = 10 m/s².',
      'True weight in air: W_air = mg = 20 × 10 = 200 N.',
      'Apparent weight in water: F_app = mg (1 - 1 / RD) = 200 × (1 - 1/3.2) = 200 × (2.2 / 3.2).',
      'F_app = 200 × (11 / 16) = 137.5 N.',
      'Work done in lifting through 8 m: W = 137.5 N × 8 m = 1100 J.'
    ],
    whyCorrect: 'Apparent weight is 137.5 N; lifting through 8 m requires 137.5 × 8 = 1100 J.',
    distractorNotes: 'Option (B) 1600 J calculates work in air (200 N × 8 m), ignoring buoyant upthrust. Options (A) and (C) arise from incorrect relative density formulas.',
    examTip: 'Relative density (RD) = density of body / density of water. Therefore, buoyant reduction factor is always (1 - 1/RD).'
  },
  'wep-016': {
    concept: 'Work-Energy Theorem with Velocity Function',
    principle: 'Work done by all forces equals the change in kinetic energy: W = ½m(v² - u²). Velocity is obtained by taking the time derivative of displacement: v = dS/dt.',
    formula: 'v = dS/dt; W = ½ m (v_final² - v_initial²)',
    steps: [
      'Given body of mass m = 3 kg. Note: PDF text gives S = t²/3 but solution evaluates v = t² (implying S = t³/3).',
      'Using the solution formulation accepted in the official key: v = t².',
      'At t = 0 s: u = 0 m/s.',
      'At t = 2 s: v = (2)² = 4 m/s.',
      'By Work-Energy Theorem: W = ½ m (v² - u²) = ½ × 3 × (4² - 0) = ½ × 3 × 16 = 24 J.'
    ],
    whyCorrect: 'The official answer key selects (D) 24 J based on final velocity v = 4 m/s and mass 3 kg.',
    distractorNotes: 'If taking S = t²/3 strictly, v = 2t/3 = 4/3 m/s, yielding W = 8/3 J ≈ 2.67 J. This discrepancy in the source PDF is noted with a review flag.',
    examTip: 'In competitive exams, if there is a typographical slip in the question exponent (t²/3 vs t³/3), the integer answer (24 J) usually reflects the intended problem formulation.'
  },
  'wep-017': {
    concept: 'Kinetic Energy Scaling with Radius and Density',
    principle: 'Kinetic energy depends on mass and velocity squared. For solid spheres, mass scales as density times volume: m ∝ ρ r³.',
    formula: 'm ∝ ρ r³; KE = ½ m v²  ⟹  KE₁/KE₂ = (ρ₁/ρ₂) (r₁/r₂)³ (v₁/v₂)² ',
    steps: [
      'Given radii ratio r₁ : r₂ = 1 : 2.',
      'Velocities ratio v₁ : v₂ = 3 : 4.',
      'Densities ratio ρ₁ : ρ₂ = 3 : 2.',
      'Volume ratio V₁ : V₂ = (r₁ / r₂)³ = (1 / 2)³ = 1 / 8.',
      'Mass ratio m₁ : m₂ = (ρ₁ / ρ₂) × (V₁ / V₂) = (3 / 2) × (1 / 8) = 3 / 16.',
      'KE ratio KE₁ : KE₂ = (m₁ / m₂) × (v₁ / v₂)² = (3 / 16) × (3 / 4)² = (3 / 16) × (9 / 16) = 27 / 256.'
    ],
    whyCorrect: 'Multiplying mass ratio (3/16) by velocity-squared ratio (9/16) gives 27/256.',
    distractorNotes: 'Option (A) 27 : 64 forgets to square the denominator 4 in velocity (uses 4 instead of 16). Option (D) forgets the density ratio.',
    examTip: 'Break down scaling problems into separate ratios: Mass ratio = (density ratio) × (radius ratio)³, then KE ratio = (mass ratio) × (velocity ratio)².'
  },
  'wep-018': {
    concept: 'Incremental Work on a Non-Linear Energy Curve',
    principle: 'Spring potential energy U is proportional to x². Doubling the total deformation quadruples total stored energy: U(2x) = 4 U(x).',
    formula: 'U = ½ k x²; ΔU = U(x + Δx) - U(x)',
    steps: [
      'Initial compression: x₁ = 3 cm. Stored PE: U₁ = ½ k (3)² = 9 (½k) = U.',
      'Hence, the unit factor is (½k) = U / 9.',
      'Additional compression is 3 cm, so total compression is x₂ = 3 + 3 = 6 cm.',
      'Total PE at 6 cm: U₂ = ½ k (6)² = 36 (½k) = 36 × (U / 9) = 4U.',
      'Increase in potential energy: ΔU = U₂ - U₁ = 4U - U = 3U.'
    ],
    whyCorrect: 'Total energy becomes 4U; subtracting the initial U leaves an increase of 3U.',
    distractorNotes: 'Option (A) 4U is the TOTAL potential energy at 6 cm, not the INCREASE. Option (B) U assumes linear energy increase. Option (C) 2U assumes double energy for double stretch.',
    examTip: 'Always read carefully whether the question asks for "new potential energy" (4U) or "INCREASE in potential energy" (3U). Subtract initial energy for the increase!'
  },
  'wep-019': {
    concept: 'Relation Between Kinetic Energy and Linear Momentum',
    principle: 'Linear momentum p is proportional to the square root of kinetic energy: p = √(2mK). A percentage increase in K translates to p\' = p √(1 + %/100).',
    formula: 'p = √(2mK)  ⟹  p₂ / p₁ = √(K₂ / K₁)',
    steps: [
      'Let initial KE be K₁. Kinetic energy increases by 125% ⟹ K₂ = K₁ + 1.25 K₁ = 2.25 K₁.',
      'Momentum is proportional to √K: p₂ / p₁ = √(2.25 K₁ / K₁) = √2.25.',
      'Since 2.25 = (1.5)², √2.25 = 1.5.',
      'New momentum is 1.5 times initial momentum, i.e., p₂ = 1.5 p₁.',
      'Percentage increase = [(p₂ - p₁) / p₁] × 100% = (1.5 - 1) × 100% = 50%.'
    ],
    whyCorrect: '√2.25 = 1.5, representing a 50% increase in momentum.',
    distractorNotes: 'Option (B) 62.5% comes from dividing 125% by 2 (assuming linear relation instead of square root). Option (C) 250% and (D) 200% confuse decimal factors with percentages.',
    examTip: 'Memorize the standard benchmark: If KE increases by 300% (4x), p doubles (+100%). If KE increases by 125% (2.25x), p increases by 50% (1.5x).'
  },
  'wep-020': {
    concept: 'Kinetic Energy Scaling under Multiple Variable Variations',
    principle: 'Kinetic energy depends directly on mass (m) and on the square of velocity (v²). Evaluate new KE by substituting transformed mass and velocity.',
    formula: 'K = ½ m v²; K\' = ½ m\' (v\')²',
    steps: [
      'Initial KE: K = ½ m v².',
      'One-fourth of mass removed ⟹ Remaining mass: m\' = m - m/4 = (3/4)m.',
      'Velocity is doubled: v\' = 2v.',
      'New KE: K\' = ½ m\' (v\')² = ½ [(3/4)m] [2v]².',
      'Simplify: K\' = ½ × (3/4)m × 4v² = (3/4 × 4) × (½ m v²) = 3 × (½ m v²) = 3K.'
    ],
    whyCorrect: 'Removing 1/4 mass leaves 3/4 mass; doubling velocity multiplies by 4; (3/4) × 4 = 3, so new KE is 3K.',
    distractorNotes: 'Option (D) 9/4 K mistakenly squares the mass factor. Option (C) 4K assumes mass remained constant. Option (A) K assumes factors canceled.',
    examTip: 'Pay attention to phrasing: "one-fourth of mass removed" leaves 3/4 mass. If it said "mass reduced TO one-fourth", remaining mass would be 1/4.'
  }
};

export function getConceptBreakdown(questionId: string): ConceptBreakdown | null {
  return WE_POWER_BREAKDOWNS[questionId] ?? null;
}
