"""add assigned driver"""

from alembic import op
import sqlalchemy as sa


# revision identifiers

revision = "add_assigned_driver"

down_revision = "244e08e318ae"

branch_labels = None

depends_on = None


def upgrade():

    op.add_column(

        "loads",

        sa.Column(

            "assigned_driver_id",

            sa.Integer(),

            nullable=True
        )
    )


def downgrade():

    op.drop_column(

        "loads",

        "assigned_driver_id"
    )