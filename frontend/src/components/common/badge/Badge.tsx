import React from 'react';
import './Badge.css'; 
import { useTranslation } from 'react-i18next';

interface BadgeProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

function Badge({ title, value, icon }: BadgeProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="Badge">
      {icon && <span className="Badge-icon">{icon}</span>}
      <div className="Badge-content">
        <div className="Badge-title">{t(title)}</div>
        <div className="Badge-value">{value}</div>
      </div>
    </div>
  );
}

export default Badge;