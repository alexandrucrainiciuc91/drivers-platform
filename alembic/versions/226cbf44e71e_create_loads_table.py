"""create loads table

Revision ID: 226cbf44e71e
Revises: 119bff8179bb
Create Date: 2026-05-20 21:39:51.794170

"""

from typing import Sequence, Union

from alembic import op

import sqlalchemy as sa


# revision identifiers

revision: str = '226cbf44e71e'

down_revision: Union[str, Sequence[str], None] = '119bff8179bb'

branch_labels: Union[str, Sequence[str], None] = None

depends_on: Union[str, Sequence[str], None] = None


# =====================================================
# UPGRADE
# =====================================================

def upgrade() -> None:

    op.create_table(

        'loads',

        sa.Column(
            'id',
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            'company_id',
            sa.Integer(),
            nullable=True
        ),

        sa.Column(
            'pickup_country',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'pickup_city',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'delivery_country',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'delivery_city',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'distance_km',
            sa.Integer(),
            nullable=True
        ),

        sa.Column(
            'price',
            sa.Integer(),
            nullable=True
        ),

        sa.Column(
            'transport_type',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'cargo_type',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'total_weight',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'special_requirements',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'loading_date',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'phone',
            sa.String(),
            nullable=True
        ),

        sa.Column(
            'status',
            sa.String(),
            nullable=True
        ),

        sa.ForeignKeyConstraint(
            ['company_id'],
            ['users.id']
        ),

        sa.PrimaryKeyConstraint(
            'id'
        )
    )

    op.create_index(

        op.f('ix_loads_id'),

        'loads',

        ['id'],

        unique=False
    )


# =====================================================
# DOWNGRADE
# =====================================================

def downgrade() -> None:

    op.drop_index(

        op.f('ix_loads_id'),

        table_name='loads'
    )

    op.drop_table('loads')