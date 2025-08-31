import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedProducts, onBulkUpdate, onClearSelection }) => {
  const [showBulkPanel, setShowBulkPanel] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkPrice, setBulkPrice] = useState('');
  const [bulkVisibility, setBulkVisibility] = useState('');

  const bulkActionOptions = [
    { value: 'price', label: 'Atualizar Preços' },
    { value: 'visibility', label: 'Alterar Visibilidade' },
    { value: 'delete', label: 'Excluir Produtos' }
  ];

  const visibilityOptions = [
    { value: 'visible', label: 'Tornar Visível' },
    { value: 'hidden', label: 'Ocultar' }
  ];

  const handleBulkSubmit = () => {
    const updates = {};

    if (bulkAction === 'price' && bulkPrice) {
      updates.price = parseFloat(bulkPrice?.replace(',', '.'));
    }

    if (bulkAction === 'visibility' && bulkVisibility) {
      updates.isVisible = bulkVisibility === 'visible';
    }

    if (bulkAction === 'delete') {
      updates.delete = true;
    }

    onBulkUpdate(selectedProducts, updates);
    setShowBulkPanel(false);
    setBulkAction('');
    setBulkPrice('');
    setBulkVisibility('');
  };

  const formatPrice = (value) => {
    const numericValue = value?.replace(/\D/g, '');
    const formattedValue = (parseInt(numericValue) / 100)?.toFixed(2);
    return formattedValue?.replace('.', ',');
  };

  if (selectedProducts?.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-body font-medium">
              {selectedProducts?.length}
            </span>
          </div>
          <div>
            <p className="font-body font-medium text-foreground">
              {selectedProducts?.length} produto{selectedProducts?.length > 1 ? 's' : ''} selecionado{selectedProducts?.length > 1 ? 's' : ''}
            </p>
            <p className="text-sm text-muted-foreground">
              Escolha uma ação para aplicar em lote
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBulkPanel(!showBulkPanel)}
            iconName="Settings"
            iconPosition="left"
          >
            Ações em Lote
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
          >
            Limpar
          </Button>
        </div>
      </div>
      {/* Bulk Actions Panel */}
      {showBulkPanel && (
        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Ação"
              placeholder="Selecione uma ação"
              options={bulkActionOptions}
              value={bulkAction}
              onChange={setBulkAction}
            />

            {bulkAction === 'price' && (
              <Input
                label="Novo Preço (R$)"
                type="text"
                placeholder="0,00"
                value={bulkPrice}
                onChange={(e) => setBulkPrice(formatPrice(e?.target?.value))}
                description="Preço será aplicado a todos os produtos selecionados"
              />
            )}

            {bulkAction === 'visibility' && (
              <Select
                label="Visibilidade"
                placeholder="Selecione a visibilidade"
                options={visibilityOptions}
                value={bulkVisibility}
                onChange={setBulkVisibility}
              />
            )}

            {bulkAction === 'delete' && (
              <div className="flex items-end">
                <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-error">
                    <Icon name="AlertTriangle" size={16} />
                    <span className="text-sm font-body font-medium">
                      Esta ação não pode ser desfeita
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {bulkAction && (
            <div className="flex items-center justify-end space-x-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowBulkPanel(false);
                  setBulkAction('');
                  setBulkPrice('');
                  setBulkVisibility('');
                }}
              >
                Cancelar
              </Button>
              <Button
                variant={bulkAction === 'delete' ? 'destructive' : 'default'}
                size="sm"
                onClick={handleBulkSubmit}
                iconName={bulkAction === 'delete' ? 'Trash2' : 'Check'}
                iconPosition="left"
              >
                {bulkAction === 'delete' ? 'Excluir Produtos' : 'Aplicar Alterações'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkActions;