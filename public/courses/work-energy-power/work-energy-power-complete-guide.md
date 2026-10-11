# Work, Energy and Power — Complete Chapter Guide & Formulas

## Chapter Overview (EAPCET Physics)

Work, Energy and Power is one of the highest-weightage mechanics chapters in EAPCET. It bridges vector algebra, Newton's Laws, and energy conservation.

---

## 1. Work Done

### A. Constant Force
$$\vec{W} = \vec{F} \cdot \vec{s} = F s \cos\theta$$
- **Positive work**: $0^\circ \le \theta < 90^\circ$ (e.g. lifting force doing work)
- **Zero work**: $\theta = 90^\circ$ (e.g. centripetal force, magnetic Lorentz force)
- **Negative work**: $90^\circ < \theta \le 180^\circ$ (e.g. friction)

### B. Variable Force
$$W = \int_{x_1}^{x_2} F(x) \, dx$$
For 3D motion:
$$W = \int_{\vec{r}_1}^{\vec{r}_2} \vec{F} \cdot d\vec{r} = \int (F_x dx + F_y dy + F_z dz)$$

### C. Graphical Interpretation
The area under the Force-Displacement ($F-x$) graph gives the work done.

---

## 2. Kinetic Energy & Work-Energy Theorem

### Kinetic Energy
$$K = \frac{1}{2} m v^2 = \frac{p^2}{2m}$$
- Relation with momentum: $p = \sqrt{2mK}$
- If $K$ increases by percentage $x\%$, new momentum: $p' = p \sqrt{1 + x/100}$

### Work-Energy Theorem
$$W_{\text{net}} = \Delta K = K_f - K_i = \frac{1}{2}m(v^2 - u^2)$$
> Valid for all types of forces: conservative, non-conservative, internal, and external.

---

## 3. Potential Energy & Conservative Forces

### Potential Energy Definition
$$\Delta U = -W_{\text{conservative}} = -\int_{r_i}^{r_f} \vec{F}_c \cdot d\vec{r}$$
$$F = -\frac{dU}{dr}$$

### Gravitational Potential Energy
- Near earth surface: $U = mgh$ (taking ground as reference $U=0$)
- For variable mass/extended bodies: $U = m g h_{\text{CG}}$ (height of Center of Gravity)

### Elastic Potential Energy (Spring)
- Restoring force: $F = -kx$ (Hooke's Law)
- Stored energy: $U = \frac{1}{2} k x^2$
- Work to stretch/compress from $x_1$ to $x_2$:
  $$W = \frac{1}{2} k (x_2^2 - x_1^2)$$

---

## 4. Power

### Instantaneous Power
$$P = \frac{dW}{dt} = \vec{F} \cdot \vec{v} = F v \cos\theta$$

### Average Power
$$P_{\text{avg}} = \frac{\text{Total Work Done}}{\text{Total Time Taken}} = \frac{W}{t}$$
- Units: Watt ($1\text{ W} = 1\text{ J/s}$), Horsepower ($1\text{ hp} = 746\text{ W}$)

---

## 5. Frequently Tested EAPCET Special Cases

1. **Hanging Chain Problem**:
   If a uniform chain of length $L$ and mass $M$ has $\frac{1}{n}$ of its length hanging over a table:
   $$W = \frac{M g L}{2 n^2}$$

2. **Raising a Rod**:
   Work done in raising one end of a uniform rod of length $L$ and mass $M$ to angle $\theta$:
   $$W = M g \left(\frac{L}{2}\right) \sin\theta$$

3. **Lifting in a Liquid / Buoyancy**:
   Apparent weight: $F = M g \left(1 - \frac{\rho_{\text{liquid}}}{\rho_{\text{body}}}\right)$
   $$W = M g \left(1 - \frac{\rho_L}{\rho_B}\right) h$$

4. **Rearranging a Cuboidal Block**:
   Work to change base from largest face to smallest face:
   $$W = M g (h_{\text{CG, final}} - h_{\text{CG, initial}})$$
