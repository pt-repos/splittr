"""drop group_id not null constraint from Expense table

Revision ID: 2ba3946ed820
Revises: ab860ae40a86
Create Date: 2020-02-11 13:21:54.614952

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ba3946ed820'
down_revision = 'ab860ae40a86'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('expense', 'group_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('expense', 'group_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###