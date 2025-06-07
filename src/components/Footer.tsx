export const Footer = () => {
  return (
    <footer className="footer">
      <p>
        ©{new Date().getFullYear()} Pokémon. ©1995 -{new Date().getFullYear()}{" "}
        Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.
      </p>
    </footer>
  );
};
